import { useEffect } from "react";

export function useDocumentTitle(title = "Welcome to the home page!") { // Added default value for base test, and parameter for extra credit
  useEffect(() => {
    document.title = title;
  }, [title]); // Added title to dependency array
}

export default function Home() {
  useDocumentTitle(); // Calling the hook

  return (
    <div>
      <h1>Home Page</h1>
      <p>
        To see the title change in the browser tab, click the 'Open in new tab'
        link above
      </p>
    </div>
  );
}
