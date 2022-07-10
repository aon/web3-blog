interface NewTabHrefProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NewTabHref = (props: NewTabHrefProps) => {
  return (
    <a
      style={{ display: "table-cell" }}
      target="_blank"
      rel="noopener noreferrer"
      href={props.href}
      className={props.className}
    >
      {props.children}
    </a>
  );
};

export default NewTabHref;
