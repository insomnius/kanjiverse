import { Fragment, type ReactNode } from "react"

/**
 * Tiny markdown renderer for the subset our release notes use:
 *   block:  h2, h3, hr, ul, fenced code block, paragraph
 *   inline: **bold**, `code`, [text](url), *italic*
 *
 * No `dangerouslySetInnerHTML` anywhere — every node is React-emitted, so
 * we don't depend on third-party HTML sanitization. Inputs come from our
 * own GitHub Releases authored by repo maintainers, but the no-innerHTML
 * rule keeps that boundary tight in case an OAuth-token leak ever lets a
 * stranger draft a release.
 */

interface MarkdownProps {
  body: string
}

export default function ReleaseNotesMarkdown({ body }: MarkdownProps): ReactNode {
  const blocks = parseBlocks(body)
  return (
    <div className="space-y-3 text-sm text-sumi/85 leading-relaxed">
      {blocks.map((block, i) => renderBlock(block, i))}
    </div>
  )
}

type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "hr" }
  | { type: "ul"; items: string[] }
  | { type: "code"; lang: string; text: string }
  | { type: "p"; text: string }

function parseBlocks(body: string): Block[] {
  const lines = body.replace(/\r\n/g, "\n").split("\n")
  const blocks: Block[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3).trim() })
      i++
    } else if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.slice(4).trim() })
      i++
    } else if (line.trim() === "---") {
      blocks.push({ type: "hr" })
      i++
    } else if (line.startsWith("```")) {
      const lang = line.slice(3).trim()
      const buf: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith("```")) {
        buf.push(lines[i])
        i++
      }
      if (i < lines.length) i++
      blocks.push({ type: "code", lang, text: buf.join("\n") })
    } else if (line.startsWith("- ")) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2))
        i++
      }
      blocks.push({ type: "ul", items })
    } else if (line.trim() === "") {
      i++
    } else {
      // Paragraph — gather consecutive non-empty, non-block-prefix lines.
      const buf: string[] = [line]
      i++
      while (i < lines.length) {
        const next = lines[i]
        if (next.trim() === "") break
        if (
          next.startsWith("## ") ||
          next.startsWith("### ") ||
          next.trim() === "---" ||
          next.startsWith("```") ||
          next.startsWith("- ")
        ) break
        buf.push(next)
        i++
      }
      blocks.push({ type: "p", text: buf.join(" ") })
    }
  }
  return blocks
}

function renderBlock(block: Block, key: number): ReactNode {
  switch (block.type) {
    case "h2":
      return (
        <h2
          key={key}
          className="font-display text-lg sm:text-xl text-sumi font-medium tracking-tight mt-5 first:mt-0"
        >
          {renderInline(block.text)}
        </h2>
      )
    case "h3":
      return (
        <h3
          key={key}
          className="font-display text-base sm:text-lg text-sumi font-medium tracking-tight mt-4"
        >
          {renderInline(block.text)}
        </h3>
      )
    case "hr":
      return <hr key={key} className="border-t border-sumi/15 my-4" />
    case "ul":
      return (
        <ul key={key} className="list-disc list-outside pl-5 space-y-1 marker:text-vermilion-deep">
          {block.items.map((it, i) => (
            <li key={i}>{renderInline(it)}</li>
          ))}
        </ul>
      )
    case "code":
      return (
        <pre
          key={key}
          className="font-mono text-xs bg-cream-deep text-sumi rounded-md p-3 overflow-x-auto border border-sumi/10"
        >
          <code>{block.text}</code>
        </pre>
      )
    case "p":
      return (
        <p key={key} className="text-sumi/85">
          {renderInline(block.text)}
        </p>
      )
  }
}

/**
 * Inline rendering. Single pass: tokenise into spans of (text | bold |
 * italic | code | link) and emit React nodes. Order of patterns matters
 * — code first so `*foo*` inside backticks isn't italicised.
 */
function renderInline(input: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let i = 0
  let buf = ""
  let key = 0
  const flush = () => {
    if (buf) {
      nodes.push(buf)
      buf = ""
    }
  }
  while (i < input.length) {
    const ch = input[i]
    if (ch === "`") {
      const end = input.indexOf("`", i + 1)
      if (end > i) {
        flush()
        nodes.push(
          <code key={key++} className="font-mono text-[0.85em] bg-cream-deep px-1 py-0.5 rounded text-sumi border border-sumi/10">
            {input.slice(i + 1, end)}
          </code>,
        )
        i = end + 1
        continue
      }
    } else if (ch === "*" && input[i + 1] === "*") {
      const end = input.indexOf("**", i + 2)
      if (end > i + 1) {
        flush()
        nodes.push(
          <strong key={key++} className="font-semibold text-sumi">
            {renderInline(input.slice(i + 2, end))}
          </strong>,
        )
        i = end + 2
        continue
      }
    } else if (ch === "*") {
      const end = input.indexOf("*", i + 1)
      if (end > i) {
        flush()
        nodes.push(
          <em key={key++} className="italic">
            {renderInline(input.slice(i + 1, end))}
          </em>,
        )
        i = end + 1
        continue
      }
    } else if (ch === "[") {
      const closeBracket = input.indexOf("]", i + 1)
      if (closeBracket > i && input[closeBracket + 1] === "(") {
        const closeParen = input.indexOf(")", closeBracket + 2)
        if (closeParen > closeBracket) {
          const text = input.slice(i + 1, closeBracket)
          const url = input.slice(closeBracket + 2, closeParen)
          flush()
          nodes.push(
            <a
              key={key++}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-vermilion-deep underline decoration-vermilion/40 underline-offset-2 hover:decoration-vermilion-deep transition-colors motion-reduce:transition-none"
            >
              {text}
            </a>,
          )
          i = closeParen + 1
          continue
        }
      }
    }
    buf += ch
    i++
  }
  flush()
  return nodes.map((n, idx) => <Fragment key={idx}>{n}</Fragment>)
}
