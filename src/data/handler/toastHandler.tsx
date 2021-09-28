export const toastHandler = (e: any, retry: () => void, reject: () => void) => {
  toast.show('에러가 발생했습니다.', { type: 'danger' });
  reject();
};
