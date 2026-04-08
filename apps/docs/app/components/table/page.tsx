import {
  Alert,
  Container,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
  TableMobileList,
  TableMobileItem,
} from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { CodeBlock } from '@/components/CodeBlock'
import { highlight } from '@/lib/highlight'
import { ClickableRowsDemo } from './_demos'

const basicCode = `import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
  TableMobileList, TableMobileItem,
} from '@umichkisa-ds/web'

const members = [
  { name: '김민수', role: 'President', email: 'minsu@umich.edu', joined: '2024' },
  { name: '이서연', role: 'VP External', email: 'seoyeon@umich.edu', joined: '2024' },
  { name: '박지훈', role: 'Treasurer', email: 'jihun@umich.edu', joined: '2025' },
  { name: '정하은', role: 'Secretary', email: 'haeun@umich.edu', joined: '2025' },
  { name: '최유진', role: 'Webmaster', email: 'yujin@umich.edu', joined: '2025' },
]

{/* Desktop table */}
<div className="hidden md:block">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Role</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Joined</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {members.map((m) => (
        <TableRow key={m.email}>
          <TableCell>{m.name}</TableCell>
          <TableCell>{m.role}</TableCell>
          <TableCell>{m.email}</TableCell>
          <TableCell>{m.joined}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>

{/* Mobile list */}
<div className="block md:hidden">
  <TableMobileList>
    {members.map((m) => (
      <TableMobileItem key={m.email}>
        <span className="type-body-sm text-foreground">{m.name}</span>
        <span className="type-caption text-muted-foreground">
          {m.role} · {m.email} · {m.joined}
        </span>
      </TableMobileItem>
    ))}
  </TableMobileList>
</div>`

const sizeSmCode = `<Table size="sm">
  <TableHeader>
    <TableRow>
      <TableHead>Token</TableHead>
      <TableHead>Value</TableHead>
      <TableHead>Usage</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>--color-brand-primary</TableCell>
      <TableCell>oklch(0.279 0.074 261.7)</TableCell>
      <TableCell>Primary brand navy</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>--color-brand-accent</TableCell>
      <TableCell>oklch(0.818 0.119 85.4)</TableCell>
      <TableCell>Maize accent</TableCell>
    </TableRow>
  </TableBody>
</Table>`

const sizeMdCode = `<Table size="md">
  <TableHeader>
    <TableRow>
      <TableHead>Token</TableHead>
      <TableHead>Value</TableHead>
      <TableHead>Usage</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>--color-brand-primary</TableCell>
      <TableCell>oklch(0.279 0.074 261.7)</TableCell>
      <TableCell>Primary brand navy</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>--color-brand-accent</TableCell>
      <TableCell>oklch(0.818 0.119 85.4)</TableCell>
      <TableCell>Maize accent</TableCell>
    </TableRow>
  </TableBody>
</Table>`

const bulletinCode = `import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
  TableMobileList, TableMobileItem,
} from '@umichkisa-ds/web'

{/* Desktop table */}
<div className="hidden md:block">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>#</TableHead>
        <TableHead>제목</TableHead>
        <TableHead>작성자</TableHead>
        <TableHead>날짜</TableHead>
        <TableHead>조회</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow className="bg-surface-subtle">
        <TableCell>—</TableCell>
        <TableCell>[공지] 2025 봄학기 회비 납부 안내</TableCell>
        <TableCell>운영진</TableCell>
        <TableCell>2025-03-01</TableCell>
        <TableCell>342</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>5</TableCell>
        <TableCell>겨울방학 스터디 모집합니다</TableCell>
        <TableCell>김민수</TableCell>
        <TableCell>2025-02-28</TableCell>
        <TableCell>89</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>4</TableCell>
        <TableCell>족발 같이 시켜먹을 사람</TableCell>
        <TableCell>이서연</TableCell>
        <TableCell>2025-02-27</TableCell>
        <TableCell>156</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>3</TableCell>
        <TableCell>기숙사 계약 관련 질문</TableCell>
        <TableCell>박지훈</TableCell>
        <TableCell>2025-02-26</TableCell>
        <TableCell>67</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>

{/* Mobile list */}
<div className="block md:hidden">
  <TableMobileList>
    <TableMobileItem className="bg-surface-subtle">
      <span className="type-body-sm text-foreground">[공지] 2025 봄학기 회비 납부 안내</span>
      <span className="type-caption text-muted-foreground">2025-03-01 · 운영진 · 342 views</span>
    </TableMobileItem>
    <TableMobileItem>
      <span className="type-body-sm text-foreground">겨울방학 스터디 모집합니다</span>
      <span className="type-caption text-muted-foreground">2025-02-28 · 김민수 · 89 views</span>
    </TableMobileItem>
    <TableMobileItem>
      <span className="type-body-sm text-foreground">족발 같이 시켜먹을 사람</span>
      <span className="type-caption text-muted-foreground">2025-02-27 · 이서연 · 156 views</span>
    </TableMobileItem>
    <TableMobileItem>
      <span className="type-body-sm text-foreground">기숙사 계약 관련 질문</span>
      <span className="type-caption text-muted-foreground">2025-02-26 · 박지훈 · 67 views</span>
    </TableMobileItem>
  </TableMobileList>
</div>`

const clickableCode = `import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
  TableMobileList, TableMobileItem,
} from '@umichkisa-ds/web'
import { useRouter } from 'next/navigation'

const posts = [
  { id: 5, title: '겨울방학 스터디 모집합니다', author: '김민수', date: '2025-02-28', views: 89 },
  { id: 4, title: '족발 같이 시켜먹을 사람', author: '이서연', date: '2025-02-27', views: 156 },
  { id: 3, title: '기숙사 계약 관련 질문', author: '박지훈', date: '2025-02-26', views: 67 },
]

const router = useRouter()

{/* Desktop table */}
<div className="hidden md:block">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>#</TableHead>
        <TableHead>제목</TableHead>
        <TableHead>작성자</TableHead>
        <TableHead>날짜</TableHead>
        <TableHead>조회</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {posts.map((post) => (
        <TableRow
          key={post.id}
          className="cursor-pointer"
          onClick={() => router.push(\`/posts/\${post.id}\`)}
        >
          <TableCell>{post.id}</TableCell>
          <TableCell>{post.title}</TableCell>
          <TableCell>{post.author}</TableCell>
          <TableCell>{post.date}</TableCell>
          <TableCell>{post.views}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>

{/* Mobile list */}
<div className="block md:hidden">
  <TableMobileList>
    {posts.map((post) => (
      <div
        key={post.id}
        className="cursor-pointer"
        onClick={() => router.push(\`/posts/\${post.id}\`)}
      >
        <TableMobileItem>
          <span className="type-body-sm text-foreground">{post.title}</span>
          <span className="type-caption text-muted-foreground">
            {post.date} · {post.author} · {post.views} views
          </span>
        </TableMobileItem>
      </div>
    ))}
  </TableMobileList>
</div>`

const footerCode = `import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableFooter,
  TableMobileList, TableMobileItem,
} from '@umichkisa-ds/web'

{/* Desktop table */}
<div className="hidden md:block">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Item</TableHead>
        <TableHead>Qty</TableHead>
        <TableHead>Price</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Pizza</TableCell>
        <TableCell>5</TableCell>
        <TableCell>$75.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Drinks</TableCell>
        <TableCell>24</TableCell>
        <TableCell>$36.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Supplies</TableCell>
        <TableCell>1</TableCell>
        <TableCell>$15.00</TableCell>
      </TableRow>
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colSpan={2}>Total</TableCell>
        <TableCell>$126.00</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
</div>

{/* Mobile list */}
<div className="block md:hidden">
  <TableMobileList>
    <TableMobileItem>
      <span className="type-body-sm text-foreground">Pizza</span>
      <span className="type-caption text-muted-foreground">5 · $75.00</span>
    </TableMobileItem>
    <TableMobileItem>
      <span className="type-body-sm text-foreground">Drinks</span>
      <span className="type-caption text-muted-foreground">24 · $36.00</span>
    </TableMobileItem>
    <TableMobileItem>
      <span className="type-body-sm text-foreground">Supplies</span>
      <span className="type-caption text-muted-foreground">1 · $15.00</span>
    </TableMobileItem>
    <TableMobileItem className="bg-surface-subtle font-semibold">
      <span className="type-body-sm text-foreground">Total</span>
      <span className="type-caption text-muted-foreground">$126.00</span>
    </TableMobileItem>
  </TableMobileList>
</div>`

export default async function TablePage() {
  const [
    basicHighlighted,
    sizeSmHighlighted,
    sizeMdHighlighted,
    bulletinHighlighted,
    clickableHighlighted,
    footerHighlighted,
  ] = await Promise.all([
    highlight(basicCode),
    highlight(sizeSmCode),
    highlight(sizeMdCode),
    highlight(bulletinCode),
    highlight(clickableCode),
    highlight(footerCode),
  ])

  return (
    <Container size="md" as="article">

      {/* -- Header -------------------------------------------------- */}
      <h1 className="type-h1 mb-4 text-foreground">Table</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Displays structured tabular data in rows and columns with optional headers,
        footers, and captions.
      </p>
      <Alert variant="info" className="mb-4">
        Use Table for data that benefits from column alignment and scanning — member directories, bulletin boards, budget summaries.
      </Alert>
      <Alert variant="info" title="Required pair" className="mb-8">
        Table and TableMobileList are a required pair. Every Table must ship with a TableMobileList for mobile viewports — the examples below show the canonical pattern.
      </Alert>

      {/* -- Composition ----------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Composition</h2>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Table is composed from 10 sub-components that mirror native HTML table
        elements. Here is how they nest together:
      </p>
      <CodeBlock code={`Table
├── TableCaption          {/* optional accessible description */}
├── TableHeader
│   └── TableRow
│       └── TableHead     {/* <th> header cells */}
├── TableBody
│   └── TableRow
│       └── TableCell     {/* <td> body cells */}
└── TableFooter           {/* optional summary/totals */}
    └── TableRow
        └── TableCell

TableMobileList           {/* mobile alternative */}
└── TableMobileItem`} lang="text" />

      {/* -- Examples ------------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Basic */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Basic</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A member directory. Desktop renders the full Table; mobile swaps to a
        TableMobileList of stacked items.
      </p>
      <ComponentPreview code={basicCode} highlightedCode={basicHighlighted}>
        <div className="w-full">
          {/* Desktop table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>김민수</TableCell>
                  <TableCell>President</TableCell>
                  <TableCell>minsu@umich.edu</TableCell>
                  <TableCell>2024</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>이서연</TableCell>
                  <TableCell>VP External</TableCell>
                  <TableCell>seoyeon@umich.edu</TableCell>
                  <TableCell>2024</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>박지훈</TableCell>
                  <TableCell>Treasurer</TableCell>
                  <TableCell>jihun@umich.edu</TableCell>
                  <TableCell>2025</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>정하은</TableCell>
                  <TableCell>Secretary</TableCell>
                  <TableCell>haeun@umich.edu</TableCell>
                  <TableCell>2025</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>최유진</TableCell>
                  <TableCell>Webmaster</TableCell>
                  <TableCell>yujin@umich.edu</TableCell>
                  <TableCell>2025</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Mobile list */}
          <div className="block md:hidden">
            <TableMobileList>
              <TableMobileItem>
                <span className="type-body-sm text-foreground">김민수</span>
                <span className="type-caption text-muted-foreground">President · minsu@umich.edu · 2024</span>
              </TableMobileItem>
              <TableMobileItem>
                <span className="type-body-sm text-foreground">이서연</span>
                <span className="type-caption text-muted-foreground">VP External · seoyeon@umich.edu · 2024</span>
              </TableMobileItem>
              <TableMobileItem>
                <span className="type-body-sm text-foreground">박지훈</span>
                <span className="type-caption text-muted-foreground">Treasurer · jihun@umich.edu · 2025</span>
              </TableMobileItem>
              <TableMobileItem>
                <span className="type-body-sm text-foreground">정하은</span>
                <span className="type-caption text-muted-foreground">Secretary · haeun@umich.edu · 2025</span>
              </TableMobileItem>
              <TableMobileItem>
                <span className="type-body-sm text-foreground">최유진</span>
                <span className="type-caption text-muted-foreground">Webmaster · yujin@umich.edu · 2025</span>
              </TableMobileItem>
            </TableMobileList>
          </div>
        </div>
      </ComponentPreview>

      {/* Size */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Size</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">size=&quot;sm&quot;</code>{' '}
        for tables embedded within body content (reference tables, token lists).
        The default{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">size=&quot;md&quot;</code>{' '}
        is suited for standalone tables like bulletin boards and data views.
      </p>
      <div className="flex flex-col gap-6 my-4">
        <div>
          <p className="type-label mb-2 text-muted-foreground">sm</p>
          <ComponentPreview code={sizeSmCode} highlightedCode={sizeSmHighlighted}>
            <div className="w-full">
              <Table size="sm">
                <TableHeader>
                  <TableRow>
                    <TableHead>Token</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Usage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>--color-brand-primary</TableCell>
                    <TableCell>oklch(0.279 0.074 261.7)</TableCell>
                    <TableCell>Primary brand navy</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>--color-brand-accent</TableCell>
                    <TableCell>oklch(0.818 0.119 85.4)</TableCell>
                    <TableCell>Maize accent</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </ComponentPreview>
        </div>
        <div>
          <p className="type-label mb-2 text-muted-foreground">md (default)</p>
          <ComponentPreview code={sizeMdCode} highlightedCode={sizeMdHighlighted}>
            <div className="w-full">
              <Table size="md">
                <TableHeader>
                  <TableRow>
                    <TableHead>Token</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Usage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>--color-brand-primary</TableCell>
                    <TableCell>oklch(0.279 0.074 261.7)</TableCell>
                    <TableCell>Primary brand navy</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>--color-brand-accent</TableCell>
                    <TableCell>oklch(0.818 0.119 85.4)</TableCell>
                    <TableCell>Maize accent</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </ComponentPreview>
        </div>
      </div>

      {/* Bulletin Board */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Bulletin Board</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A KISA-style board layout with Korean text. The announcement row uses{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          bg-surface-subtle
        </code>{' '}
        to visually distinguish pinned content from regular posts.
      </p>
      <ComponentPreview code={bulletinCode} highlightedCode={bulletinHighlighted}>
        <div className="w-full">
          {/* Desktop table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>제목</TableHead>
                  <TableHead>작성자</TableHead>
                  <TableHead>날짜</TableHead>
                  <TableHead>조회</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="bg-surface-subtle">
                  <TableCell>—</TableCell>
                  <TableCell>[공지] 2025 봄학기 회비 납부 안내</TableCell>
                  <TableCell>운영진</TableCell>
                  <TableCell>2025-03-01</TableCell>
                  <TableCell>342</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>5</TableCell>
                  <TableCell>겨울방학 스터디 모집합니다</TableCell>
                  <TableCell>김민수</TableCell>
                  <TableCell>2025-02-28</TableCell>
                  <TableCell>89</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>4</TableCell>
                  <TableCell>족발 같이 시켜먹을 사람</TableCell>
                  <TableCell>이서연</TableCell>
                  <TableCell>2025-02-27</TableCell>
                  <TableCell>156</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>3</TableCell>
                  <TableCell>기숙사 계약 관련 질문</TableCell>
                  <TableCell>박지훈</TableCell>
                  <TableCell>2025-02-26</TableCell>
                  <TableCell>67</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Mobile list */}
          <div className="block md:hidden">
            <TableMobileList>
              <TableMobileItem className="bg-surface-subtle">
                <span className="type-body-sm text-foreground">[공지] 2025 봄학기 회비 납부 안내</span>
                <span className="type-caption text-muted-foreground">2025-03-01 · 운영진 · 342 views</span>
              </TableMobileItem>
              <TableMobileItem>
                <span className="type-body-sm text-foreground">겨울방학 스터디 모집합니다</span>
                <span className="type-caption text-muted-foreground">2025-02-28 · 김민수 · 89 views</span>
              </TableMobileItem>
              <TableMobileItem>
                <span className="type-body-sm text-foreground">족발 같이 시켜먹을 사람</span>
                <span className="type-caption text-muted-foreground">2025-02-27 · 이서연 · 156 views</span>
              </TableMobileItem>
              <TableMobileItem>
                <span className="type-body-sm text-foreground">기숙사 계약 관련 질문</span>
                <span className="type-caption text-muted-foreground">2025-02-26 · 박지훈 · 67 views</span>
              </TableMobileItem>
            </TableMobileList>
          </div>
        </div>
      </ComponentPreview>

      {/* Clickable Rows */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Clickable rows</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Add{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          cursor-pointer
        </code>{' '}
        and an{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          onClick
        </code>{' '}
        handler to TableRow for navigable rows — ideal for bulletin boards
        where clicking a row opens the post. On mobile, wrap each TableMobileItem
        in a clickable element with the same handler.
      </p>
      <ComponentPreview code={clickableCode} highlightedCode={clickableHighlighted}>
        <ClickableRowsDemo />
      </ComponentPreview>

      {/* With Footer */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With Footer</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        An event budget table with a TableFooter for the total row. The footer
        uses{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          colSpan
        </code>{' '}
        to merge cells for the summary label. On mobile, the total appears as a
        distinguished final TableMobileItem.
      </p>
      <ComponentPreview code={footerCode} highlightedCode={footerHighlighted}>
        <div className="w-full">
          {/* Desktop table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Pizza</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>$75.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Drinks</TableCell>
                  <TableCell>24</TableCell>
                  <TableCell>$36.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Supplies</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>$15.00</TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell>$126.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>

          {/* Mobile list */}
          <div className="block md:hidden">
            <TableMobileList>
              <TableMobileItem>
                <span className="type-body-sm text-foreground">Pizza</span>
                <span className="type-caption text-muted-foreground">5 · $75.00</span>
              </TableMobileItem>
              <TableMobileItem>
                <span className="type-body-sm text-foreground">Drinks</span>
                <span className="type-caption text-muted-foreground">24 · $36.00</span>
              </TableMobileItem>
              <TableMobileItem>
                <span className="type-body-sm text-foreground">Supplies</span>
                <span className="type-caption text-muted-foreground">1 · $15.00</span>
              </TableMobileItem>
              <TableMobileItem className="bg-surface-subtle">
                <span className="type-body-sm text-foreground"><strong>Total</strong></span>
                <span className="type-caption text-muted-foreground">$126.00</span>
              </TableMobileItem>
            </TableMobileList>
          </div>
        </div>
      </ComponentPreview>

      {/* -- API Reference -------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Table is composed from several sub-components you assemble together. All
        sub-components accept{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">className</code>{' '}
        (merged via{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">cn()</code>)
        and native HTML attributes for the element they wrap. Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">className</code>{' '}
        for layout context (margin, width) — not for restyling component internals.
      </p>

      {/* Table props */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Table</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Root component. Wraps a native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;table&gt;</code>{' '}
        inside an overflow scroll container.
      </p>
      {/* Desktop table */}
      <div className="hidden md:block">
        <Table size="sm">
          <TableHeader>
            <TableRow>
              <TableHead>Prop</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Default</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">size</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&quot;sm&quot; | &quot;md&quot;</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&quot;md&quot;</code></TableCell>
              <TableCell>Controls font size and cell padding. Propagated to children via context.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">className</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">string</code></TableCell>
              <TableCell>—</TableCell>
              <TableCell>Merged via <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">cn()</code>.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">children</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">ReactNode</code></TableCell>
              <TableCell>—</TableCell>
              <TableCell>TableHeader, TableBody, TableFooter, and TableCaption children.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {/* Mobile list */}
      <div className="block md:hidden">
        <TableMobileList>
          <TableMobileItem>
            <span className="type-body-sm text-foreground">size</span>
            <span className="type-caption text-muted-foreground">&quot;sm&quot; | &quot;md&quot; · &quot;md&quot; · Controls font size and cell padding. Propagated to children via context.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground">className</span>
            <span className="type-caption text-muted-foreground">string · — · Merged via cn().</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground">children</span>
            <span className="type-caption text-muted-foreground">ReactNode · — · TableHeader, TableBody, TableFooter, and TableCaption children.</span>
          </TableMobileItem>
        </TableMobileList>
      </div>

      {/* Sub-components */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Sub-components</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Each sub-component wraps a native HTML element. All accept{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">className</code>{' '}
        (merged via{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">cn()</code>) and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">children</code>.
      </p>
      {/* Desktop table */}
      <div className="hidden md:block">
        <Table size="sm">
          <TableHeader>
            <TableRow>
              <TableHead>Component</TableHead>
              <TableHead>Wraps</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">TableHeader</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;thead&gt;</code></TableCell>
              <TableCell>Bottom border.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">TableBody</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;tbody&gt;</code></TableCell>
              <TableCell>Divided rows.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">TableRow</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;tr&gt;</code></TableCell>
              <TableCell>Hover highlight; supports <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">onClick</code> for clickable rows.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">TableHead</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;th&gt;</code></TableCell>
              <TableCell>Header cell label.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">TableCell</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;td&gt;</code></TableCell>
              <TableCell>Body cell content; supports <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">colSpan</code>.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">TableCaption</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;caption&gt;</code></TableCell>
              <TableCell>Accessible table description.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">TableFooter</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;tfoot&gt;</code></TableCell>
              <TableCell>Summary/totals row, subtle background.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">TableMobileList</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;ol&gt;</code></TableCell>
              <TableCell>Mobile-only list container — required pair.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">TableMobileItem</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;li&gt;</code></TableCell>
              <TableCell>Stacked flex item for mobile lists.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {/* Mobile list */}
      <div className="block md:hidden">
        <TableMobileList>
          <TableMobileItem>
            <span className="type-body-sm text-foreground">TableHeader</span>
            <span className="type-caption text-muted-foreground">&lt;thead&gt; · Bottom border.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground">TableBody</span>
            <span className="type-caption text-muted-foreground">&lt;tbody&gt; · Divided rows.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground">TableRow</span>
            <span className="type-caption text-muted-foreground">&lt;tr&gt; · Hover highlight; supports onClick for clickable rows.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground">TableHead</span>
            <span className="type-caption text-muted-foreground">&lt;th&gt; · Header cell label.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground">TableCell</span>
            <span className="type-caption text-muted-foreground">&lt;td&gt; · Body cell content; supports colSpan.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground">TableCaption</span>
            <span className="type-caption text-muted-foreground">&lt;caption&gt; · Accessible table description.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground">TableFooter</span>
            <span className="type-caption text-muted-foreground">&lt;tfoot&gt; · Summary/totals row, subtle background.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground">TableMobileList</span>
            <span className="type-caption text-muted-foreground">&lt;ol&gt; · Mobile-only list container — required pair.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground">TableMobileItem</span>
            <span className="type-caption text-muted-foreground">&lt;li&gt; · Stacked flex item for mobile lists.</span>
          </TableMobileItem>
        </TableMobileList>
      </div>

    </Container>
  )
}
