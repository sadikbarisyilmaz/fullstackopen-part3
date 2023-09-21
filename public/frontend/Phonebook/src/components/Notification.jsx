export const Notification = ({ toastMessage }) => {
  if (toastMessage === null) {
    return null;
  }
  const style = toastMessage.split("")[0] !== "P" ? "success" : "error";
  return <div className={style}>{toastMessage}</div>;
};
