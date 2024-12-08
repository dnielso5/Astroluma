
const NetworkDevice = require("../models/NetworkDevice");
const wol = require('wake_on_lan');

const os = require('os');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

const getNetworkInfo = () => {
    const interfaces = os.networkInterfaces();
    const validInterfaces = Object.values(interfaces)
        .flat()
        .filter(iface => !iface.internal && iface.family === 'IPv4');

    if (validInterfaces.length === 0) {
        throw new Error('No valid network interface found');
    }

    const { address, netmask } = validInterfaces[0];
    const baseIP = address.split('.').slice(0, 3).join('.');
    return { baseIP, localIP: address, netmask };
}

const getArpTable = async () => {
    const isWindows = process.platform === 'win32';
    const command = isWindows ? 'arp -a' : 'arp-scan --localnet';

    const commands = [command];

    // Create an array of promises to run each command
    const commandPromises = commands.map(async (cmd) => {
        try {
            const { stdout } = await execAsync(cmd);
            return stdout;
        } catch (error) {
            console.error(`Error executing command "${cmd}":`, error);
            return '';
        }
    });

    // Run all commands in parallel
    const results = await Promise.all(commandPromises);

    // Combine the results into a single string
    return results.join('\n');
}

const isMulticastAddress = (ip) => {
    const [firstOctet] = ip.split('.').map(Number);
    return firstOctet >= 224 && firstOctet <= 239;
}

const isLoopbackAddress = (ip) => {
    return ip.startsWith('127.');
}

const isLinkLocalAddress = (ip) => {
    return ip.startsWith('169.254.');
}

const parseArpTable = (arpOutput, broadcastAddress) => {
    const lines = arpOutput.split('\n');
    const devices = [];

    for (const line of lines) {
        const match = line.match(/(\d+\.\d+\.\d+\.\d+)\s+([0-9A-Fa-f-:]{17})/);
        if (match) {
            const ip = match[1];
            if (
                !isMulticastAddress(ip) &&
                !isLoopbackAddress(ip) &&
                !isLinkLocalAddress(ip) &&
                ip !== broadcastAddress &&
                ip !== '255.255.255.255'
            ) {
                devices.push({
                    ip,
                    mac: match[2],
                    status: 'Online'
                });
            }
        }
    }

    return devices;
}

const pingAllIPs = async (baseIP) => {
    const isWindows = process.platform === 'win32';
    const pingCommand = isWindows ? 'ping -n 1 -w 500' : 'ping -c 1 -W 1';

    const pingPromises = [];
    for (let i = 1; i <= 254; i++) {
        const ip = `${baseIP}.${i}`;
        pingPromises.push(execAsync(`${pingCommand} ${ip}`).catch((error) => { console.log(error); }));
    }

    await Promise.all(pingPromises);
}

const ipToBinary = (ip) => {
    return ip.split('.').map(part => {
        const binaryPart = parseInt(part, 10).toString(2).padStart(8, '0');
        return binaryPart;
    }).join('');
}

const binaryToIp = (binary) => {
    return binary.match(/.{8}/g).map(byte => parseInt(byte, 2)).join('.');
}

const getSubnetBroadcastAddress = (ip, netmask) => {
    const ipBinary = ipToBinary(ip);
    const netmaskBinary = ipToBinary(netmask);
    const broadcastBinary = ipBinary.split('')
        .map((bit, index) => netmaskBinary[index] === '0' ? '1' : bit)
        .join('');

    return binaryToIp(broadcastBinary);
}

const scanNetwork = async () => {
    const { baseIP, localIP, netmask } = getNetworkInfo();
    const broadcastAddress = getSubnetBroadcastAddress(localIP, netmask);

    // Ping all IPs in parallel
    await pingAllIPs(baseIP);

    // Get ARP table
    const [arpTable] = await Promise.all([getArpTable()]);

    // Parse ARP table
    const devices = parseArpTable(arpTable, broadcastAddress);

    // Ensure the local device is included
    const localDevice = devices.find(device => device.ip === localIP);
    if (!localDevice) {
        const localMAC = Object.values(os.networkInterfaces())
            .flat()
            .find(iface => iface.address === localIP)?.mac || 'Unknown';
        devices.push({
            ip: localIP,
            mac: localMAC,
            status: 'Online (This device)'
        });
    } else {
        localDevice.status = 'Online (This device)';
    }

    return { scannedDevices: devices, broadcastAddress };
}

exports.saveDevice = async (req, res) => {
    const userId = req.user?._id;
    const {
        deviceId,
        deviceMac,
        deviceName,
        broadcastAddress,
        broadcastPort,
        deviceIcon,
        deviceIp,
        supportsWol,
        virtualDevice
    } = req.body;

    if (!deviceName || !deviceIcon || (supportsWol && (!deviceMac || !broadcastAddress || !broadcastPort))) {
        return res.status(400).json({
            error: true,
            message: "All fields are required"
        });
    }

    try {
        let device;

        if (deviceId) {
            // Update existing device
            device = await NetworkDevice.findOne({ _id: deviceId, userId });

            if (!device) {
                return res.status(400).json({
                    error: true,
                    message: "Device not found"
                });
            }

            Object.assign(device, {
                deviceName,
                deviceMac,
                broadcastAddress,
                broadcastPort,
                deviceIcon,
                deviceIp,
                supportsWol,
                virtualDevice
            });

            await device.save();
            return res.status(200).json({
                error: false,
                message: "Device updated"
            });
        } else {
            // Add new device
            device = new NetworkDevice({
                deviceName,
                deviceMac,
                broadcastAddress,
                broadcastPort,
                userId,
                deviceIcon,
                deviceIp,
                supportsWol,
                virtualDevice
            });

            await device.save();
            return res.status(200).json({
                error: false,
                message: "Device saved"
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Error saving device"
        });
    }
};

exports.listDevices = async (req, res) => {
    const userId = req.user._id;

    try {
        const { scannedDevices, broadcastAddress } = await scanNetwork();

        const scannedMacAddresses = scannedDevices.map(device => device.mac);

        const dbDevices = await NetworkDevice.find({
            userId
        }).sort({ sortOrder: 1 });

        const insertOrUpdatePromises = scannedDevices.map(async (scannedDevice) => {
            const existingDevice = await dbDevices.find(device => device.deviceMac === scannedDevice.mac);
            if (!existingDevice) {
                return NetworkDevice.create({
                    deviceName: `${scannedDevice.ip} - ${scannedDevice.mac}`,
                    deviceMac: scannedDevice.mac,
                    broadcastAddress,
                    broadcastPort: 9,
                    userId,
                    deviceIcon: null,
                    deviceIp: scannedDevice.ip,
                    supportsWol: false,
                    virtualDevice: false,
                    sortOrder: 9999,
                    isAlive: true
                });
            } else {
                return NetworkDevice.updateOne({
                    deviceMac: scannedDevice.mac,
                    userId
                }, {
                    deviceIp: scannedDevice.ip,
                    isAlive: true
                });
            }
        });

        const devicesToUpdate = dbDevices.filter(device => !scannedMacAddresses.includes(device.deviceMac));

        const updatePromises = devicesToUpdate.map(device =>
            NetworkDevice.updateOne({
                deviceMac: device.deviceMac,
                userId
            }, {
                isAlive: false
            })
        );

        await Promise.all([...insertOrUpdatePromises, ...updatePromises]);

        const updatedDevices = await NetworkDevice.find({
            userId
        }).sort({ sortOrder: 1 });

        return res.status(200).json({
            error: false,
            message: {
                items: updatedDevices
            }
        });

    } catch (err) {
        console.error(err);
        return res.status(400).json({
            error: true,
            message: "Error fetching devices."
        });
    }
};

exports.listDbDevices = async (req, res) => {
    const userId = req.user._id;

    try {
        const items = await NetworkDevice.find({ userId }).sort({ sortOrder: 1 });

        return res.status(200).json({
            error: false,
            message: { items }
        });
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: "Error fetching devices."
        });
    }
};

exports.deleteDevice = async (req, res) => {
    const userId = req.user._id;
    const deviceId = req.params.deviceId;

    if (!deviceId) {
        return res.status(400).json({
            error: true,
            message: "Device ID is required"
        });
    }

    try {
        const result = await NetworkDevice.deleteOne({ _id: deviceId, userId });

        if (result.deletedCount === 0) {
            return res.status(400).json({
                error: true,
                message: "Device not found"
            });
        }

        return res.status(200).json({
            error: false,
            message: "Device deleted"
        });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: "Error deleting device"
        });
    }
};

exports.deviceDetails = async (req, res) => {
    const userId = req.user._id;
    let deviceId = req.params.deviceId;

    if (deviceId === 'undefined') deviceId = null;

    try {
        let networkDeviceData = null;

        if (deviceId) {
            networkDeviceData = await NetworkDevice.findOne({ _id: deviceId, userId });
        }

        return res.status(200).json({
            error: false,
            message: networkDeviceData
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            error: true,
            message: "Error fetching device details."
        });
    }
};

exports.reorderDevices = async (req, res) => {
    const userId = req.user._id;
    const items = req.body.items || [];

    try {
        // Construct bulk update operations
        const bulkOps = items.map((itemId, index) => ({
            updateOne: {
                filter: { _id: itemId, userId },
                update: { sortOrder: index }
            }
        }));

        // Execute bulk update using bulkWrite
        await NetworkDevice.bulkWrite(bulkOps);

        return res.status(200).json({
            error: false,
            message: "Items reordered successfully"
        });
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: "Error reordering items"
        });
    }
};

exports.wakeDevice = async (req, res) => {
    const userId = req.user._id;
    const deviceId = req.params.deviceId || null;

    try {
        const networkDeviceData = await NetworkDevice.findOne({ _id: deviceId, userId });

        if (!networkDeviceData) {
            return res.status(400).json({
                error: true,
                message: "Device not found"
            });
        }

        const options = {
            address: networkDeviceData.broadcastAddress,
            port: networkDeviceData.broadcastPort
        };

        wol.wake(networkDeviceData.deviceMac, options, (error) => {
            if (error) {
                return res.status(400).json({
                    error: true,
                    message: "Error sending magic packet."
                });
            } else {
                return res.status(200).json({
                    error: false,
                    message: "Magic packet sent successfully."
                });
            }
        });

    } catch (err) {
        return res.status(500).json({
            error: true,
            message: "Error waking device."
        });
    }
};

