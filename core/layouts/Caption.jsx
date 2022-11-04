const style = { paddingTop: "var(--figure-padding-inner)" };

export const Caption = ({ title, children }) => {
  return (
    <div style={style}>
      <b>{title}: </b>
      {children}
    </div>
  );
};
