import {
  useTextAreaMarkdownEditor,
  boldCommand,
  italicCommand,
  codeCommand,
  linkCommand,
  unorderedListCommand,
} from "react-mde";
import ToolbarButton from "./toolbar-button";
import {
  FiBold,
  FiEye,
  FiEyeOff,
  FiItalic,
  FiCode,
  FiLink,
  FiList,
  FiHelpCircle,
} from "react-icons/fi";
import TextareaAutosize from "react-textarea-autosize";
import NewTabHref from "../new-tab-href";
import cn from "classnames";
import { ChangeEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownEditorProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const MarkdownEditor = (props: MarkdownEditorProps) => {
  const [isPreview, setIsPreview] = useState(false);
  const { ref, commandController } = useTextAreaMarkdownEditor({
    commandMap: {
      bold: boldCommand,
      italic: italicCommand,
      code: codeCommand,
      link: linkCommand,
      unorderedList: unorderedListCommand,
    },
  });

  const toolbarButtons = [
    { command: "bold", icon: <FiBold />, dataTip: "Bold" },
    { command: "italic", icon: <FiItalic />, dataTip: "Italic" },
    { command: "code", icon: <FiCode />, dataTip: "code" },
    { command: "link", icon: <FiLink />, dataTip: "Link" },
    { command: "unorderedList", icon: <FiList />, dataTip: "Unordered list" },
  ] as {
    command: Parameters<typeof commandController.executeCommand>[0];
    icon: JSX.Element;
    dataTip: string;
  }[];

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    props.onChange?.(e.target.value);
  };

  return (
    <div className={cn("flex flex-col space-y-3", props.className)}>
      <div className="flex">
        <span className="inline-flex w-full space-x-2">
          {toolbarButtons.map((button) => (
            <ToolbarButton
              key={button.command}
              onClick={() => commandController.executeCommand(button.command)}
              dataTip={button.dataTip}
              disabled={isPreview}
            >
              {button.icon}
            </ToolbarButton>
          ))}
          <NewTabHref href="https://www.markdownguide.org/basic-syntax/">
            <ToolbarButton dataTip={"Help"} disabled={isPreview}>
              <FiHelpCircle />
            </ToolbarButton>
          </NewTabHref>
        </span>
        <div
          className="tooltip"
          data-tip={isPreview ? "Close preview" : "Open preview"}
        >
          <button
            className={cn("btn btn-outline btn-sm px-2", {
              "bg-base-content": isPreview,
              "text-base-100": isPreview,
            })}
            onClick={() => setIsPreview(!isPreview)}
          >
            {isPreview ? <FiEye /> : <FiEyeOff />}
          </button>
        </div>
      </div>

      {isPreview ? (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          className="prose max-w-none lg:prose-lg"
        >
          {props.value || ""}
        </ReactMarkdown>
      ) : (
        <TextareaAutosize
          className="textarea textarea-bordered"
          minRows={6}
          ref={ref}
          defaultValue={props.value}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default MarkdownEditor;
