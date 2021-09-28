// https://github.com/arnnis/react-native-toast-notifications#--how-to-call-toast-outside-react-components

type ToastType = import("react-native-toast-notifications").ToastType;

declare global {
  const toast: ToastType;
}

declare var toast: ToastType;
