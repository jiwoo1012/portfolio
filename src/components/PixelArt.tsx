export default function PixelArt({ kind = "computer" }: { kind?: "computer" | "folder" | "smile" }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      {kind === "folder" ? <>
        <path d="M4 9H16V12H34V14H36V32H34V34H4V32H2V11H4Z" fill="#242424" />
        <path d="M4 11H14V14H34V20H4Z" fill="#9a87cd" />
        <path d="M9 7H28V24H9Z" fill="#242424" /><path d="M11 9H26V22H11Z" fill="#f8f7f2" />
        <path d="M13 12H24V14H13ZM13 17H21V19H13Z" fill="#bcb0d8" />
        <path d="M2 20H15V17H36V19H38V32H36V35H33V37H4V35H2Z" fill="#242424" />
        <path d="M4 22H17V19H36V31H34V33H32V35H4Z" fill="#c4b4ec" />
        <path d="M4 22H17V19H36V21H19V24H4Z" fill="#e8dfff" />
        <path d="M27 27H31V31H27Z" fill="#d8f38a" />
      </> : <>
        <path d="M6 5H32V7H34V29H32V31H6V29H4V7H6Z" fill="#242424" />
        <path d="M6 7H32V27H6Z" fill="#c4b4ec" />
        <path d="M8 9H30V23H8Z" fill="#242424" />
        {kind === "smile" ? <>
          <path d="M12 12H15V16H12ZM23 12H26V16H23ZM14 18H16V20H22V18H24V20H22V22H16V20H14Z" fill="#d8f38a" />
        </> : <>
          <path d="M13 12H15V14H13V16H15V18H13V16H11V14H13ZM25 12H23V14H25V16H23V18H25V16H27V14H25Z" fill="#d8f38a" />
          <path d="M19 12H21V15H19V18H17V15H19Z" fill="#c4b4ec" />
        </>}
        <path d="M26 25H30V27H26Z" fill="#f8f7f2" />
        <path d="M16 31H24V34H30V36H10V34H16Z" fill="#242424" />
        <path d="M8 37H32V39H8Z" fill="#9a87cd" />
      </>}
      <path d="M35 3H37V5H39V7H37V9H35V7H33V5H35Z" fill="#9a87cd" />
      <path d="M0 28H2V30H0Z" fill="#9a87cd" />
    </svg>
  );
}
