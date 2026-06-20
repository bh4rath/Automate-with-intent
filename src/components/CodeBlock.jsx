import { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';

export default function CodeBlock({ code }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) Prism.highlightElement(ref.current);
  }, [code]);

  return (
    <pre className="language-javascript" style={{ margin: 0 }}>
      <code ref={ref} className="language-javascript">
        {code}
      </code>
    </pre>
  );
}
