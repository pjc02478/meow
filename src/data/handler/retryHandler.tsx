import { Alert } from 'react-native';

export const retryHandler = (e: any, retry: () => void, reject: () => void) => {
  Alert.alert(
    '',
    '에러가 발생했습니다. 다시 시도하시겠습니까?',
    [
      {
        style: 'cancel',
        text: '취소',
        onPress: reject,
      },
      {
        style: 'default',
        text: '재시도',
        onPress: retry,
      },
    ],
  );
};
