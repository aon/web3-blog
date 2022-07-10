interface ToolbarButtonProps {
  onClick?: () => void | Promise<void>;
  children: React.ReactNode;
  dataTip: string;
  disabled?: boolean;
}

const ToolbarButton = (props: ToolbarButtonProps) => {
  return (
    <div className="tooltip" data-tip={props.dataTip}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <button
        className="btn btn-outline btn-sm px-2"
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    </div>
  );
};

export default ToolbarButton;
