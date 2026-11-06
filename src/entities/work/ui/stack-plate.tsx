export function StackPlate({
  stack,
  className = "grid-cols-2",
  fillOdd = false,
  dense = false,
}: {
  stack: readonly string[];
  className?: string;
  fillOdd?: boolean;
  dense?: boolean;
}) {
  return (
    <ul
      className={`grid gap-px overflow-hidden rounded-2xl bg-line ${className}`}
    >
      {stack.map((item, itemIndex) => {
        const wide =
          fillOdd && stack.length % 2 === 1 && itemIndex === stack.length - 1;
        return (
          <li
            key={item}
            className={`bg-bg px-3 py-2.5 text-ink ${dense ? "text-xs leading-4" : "text-sm leading-5"} ${wide ? "col-span-2" : ""}`}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
}
