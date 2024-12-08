import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { deletedUserState, deleteUserModalState, loadingState, loginState } from '../../atoms';
import ApiService from '../../utils/ApiService';
import NiceButton from '../NiceViews/NiceButton';
import NiceModal from '../NiceViews/NiceModal';
import makeToast from '../../utils/ToastUtils';

const DeleteUserModal = () => {
  const [modalState, setModalState] = useRecoilState(deleteUserModalState);
  const loginData = useRecoilValue(loginState);
  const setLoading = useSetRecoilState(loadingState);
  const setDeletedUser = useSetRecoilState(deletedUserState);

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  const confirmDelete = () => {
    setLoading(true);

    ApiService.get(`/api/v1/accounts/delete/${modalState.data?.userId}`, loginData?.token)
      .then(() => {
        makeToast("success", "User deleted.");
        setDeletedUser(modalState.data?.userId);
        closeModal();
      })
      .catch(() => {
        makeToast("error", "User cannot be deleted.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <NiceModal
      show={modalState.isOpen}
      title="Delete confirm"
      body={<p>Are you sure you want to delete this user? All data will also be deleted.</p>}
      footer={
        <>
          <NiceButton
            label='Cancel'
            className="bg-buttonDanger text-buttonText"
            onClick={closeModal}
          />
          <NiceButton
            label='Delete'
            className="bg-buttonWarning text-buttonText"
            onClick={confirmDelete}
          />
        </>
      } />
  );
}

const MemoizedComponent = React.memo(DeleteUserModal);
export default MemoizedComponent;
