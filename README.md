# Astroluma

![Astroluma Logo](https://getastroluma.com/astroluma.svg)

A powerful, self-hosted home lab dashboard built with the MERN stack.

## Overview

Astroluma is a comprehensive home lab dashboard solution that can be deployed on Docker, Virtual Machines, VPS, Cloud, or virtually any platform. It offers a feature-rich environment with multi-user support, making it perfect for both personal and team use.

## Features

### Core Features
- **Multi-User Support**: Individual instances for each user
- **Links Organization**: Categorize and organize links with nested categories
- **Featured Page**: Showcase important categories and links
- **Custom Domain Support**: Works simultaneously with custom domains and IPs
- **Network Device Management**: 
  - IPv4 network device scanning
  - Wake-on-LAN support
  - Device status monitoring

### Productivity Tools
- **Todo List Manager**: Create and manage multiple todo lists
- **Snippet Manager**: Store and organize code snippets
- **TOTP Generation**: Built-in Time-Based One-Time Password generation
- **Custom Page Creation**: Create and publish custom pages

### Integrations
- **Stream Hub**: Support for IP camera streams
- **Weather Integration**: Real-time weather updates
- **Third-Party Apps**: 
  - NGINX Proxy Manager
  - Proxmox
  - Portainer
  - GitHub
  - YouTube
  - More coming soon!
- **Custom Integration Support**: Create your own app integrations

### Customization
- **Themes**: 12 built-in themes with more in development
- **Flexible Layout**: Customizable sidebar and category placement

## Quick Start with Docker

```bash
# Clone the repository
git clone https://github.com/Sanjeet990/Astroluma
cd Astroluma

# Build and start containers
docker-compose up --build -d
```

The application will be available on port `8000` after installation.

## Development Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Sanjeet990/Astroluma
   cd Astroluma
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create `.env` in the `server` directory:
   ```
   MONGODB_URI=<Your Mongo instance to be used>
   SECRET_KEY=<32 character long secret>
   ```

   Create `.env` in the `client` directory:
   ```
   VITE_API_BASE_URL=http://localhost:8000
   VITE_API_WS_URL=ws://localhost:8000
   ```

4. **Run Development Servers**
   ```bash
   npm run dev:be  # Start backend
   npm run dev:fe  # Start frontend
   ```

## Demo and Resources

- **Website**: [https://getastroluma.com/](https://getastroluma.com/)
- **Live Demo**: [https://demo.getastroluma.com/](https://demo.getastroluma.com/)

## License

This project is licensed under the GNU GENERAL PUBLIC LICENSE, Version 3, 29 June 2007.

## Contributing

Contributions are welcome! Please feel free to submit pull requests.

## Maintainer

Maintained by [@Sanjeet990](https://github.com/Sanjeet990)