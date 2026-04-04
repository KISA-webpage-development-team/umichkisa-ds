'use client'

import {
  Container,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  TableFooter,
  TableMobileList,
  TableMobileItem,
} from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'

const basicCode = `import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from '@umichkisa-ds/web'

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
</Table>`

const bulletinCode = `import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from '@umichkisa-ds/web'

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
</Table>`

const footerCode = `import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableFooter,
} from '@umichkisa-ds/web'

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
</Table>`

const responsiveCode = `import {
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
    </TableBody>
  </Table>
</div>

{/* Mobile list */}
<div className="block md:hidden">
  <TableMobileList>
    <TableMobileItem>
      <span>[공지] 2025 봄학기 회비 납부 안내</span>
      <span className="type-caption text-muted-foreground">2025-03-01 · 운영진 · 342 views</span>
    </TableMobileItem>
    <TableMobileItem>
      <span>겨울방학 스터디 모집합니다</span>
      <span className="type-caption text-muted-foreground">2025-02-28 · 김민수 · 89 views</span>
    </TableMobileItem>
  </TableMobileList>
</div>`

export default function TablePage() {
  return (
    <Container size="md" as="article">

      {/* -- Header -------------------------------------------------- */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">Table</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Displays structured tabular data in rows and columns with optional headers,
        footers, and captions.
      </p>
      <p className="type-body-sm mb-8 text-muted-foreground max-w-prose">
        Use Table for data that benefits from column alignment and scanning, such as
        member directories, bulletin boards, and budget summaries. For mobile
        viewports, pair with TableMobileList for a stacked card layout.
      </p>

      {/* -- Composition ----------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Composition</h2>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Table is composed from 10 sub-components that mirror native HTML table
        elements. Here is how they nest together:
      </p>
      <pre className="my-6 rounded-lg border border-border bg-surface-muted px-4 py-4 type-caption font-mono text-foreground overflow-x-auto whitespace-pre">{`Table
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
└── TableMobileItem`}</pre>

      {/* -- Examples ------------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Basic */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Basic</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A member directory table with four columns. TableHeader provides column
        labels and TableBody holds the data rows.
      </p>
      <ComponentPreview code={basicCode}>
        <div className="w-full">
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
      </ComponentPreview>

      {/* Bulletin Board */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Bulletin Board</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A KISA-style board layout with Korean text. The announcement row uses{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          bg-surface-subtle
        </code>{' '}
        to visually distinguish pinned content from regular posts.
      </p>
      <ComponentPreview code={bulletinCode}>
        <div className="w-full">
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
      </ComponentPreview>

      {/* With Footer */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With Footer</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        An event budget table with a TableFooter for the total row. The footer
        uses{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          colSpan
        </code>{' '}
        to merge cells for the summary label.
      </p>
      <ComponentPreview code={footerCode}>
        <div className="w-full">
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
      </ComponentPreview>

      {/* Responsive */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Responsive</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        On desktop, render a full Table. On mobile, swap to a TableMobileList
        with stacked items. Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          hidden md:block
        </code>{' '}
        and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          block md:hidden
        </code>{' '}
        to toggle between the two layouts. In practice, map over your data
        array and render both layouts — CSS handles which one is visible.
      </p>
      <ComponentPreview code={responsiveCode}>
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
              <TableMobileItem>
                <span>[공지] 2025 봄학기 회비 납부 안내</span>
                <span className="type-caption text-muted-foreground">2025-03-01 · 운영진 · 342 views</span>
              </TableMobileItem>
              <TableMobileItem>
                <span>겨울방학 스터디 모집합니다</span>
                <span className="type-caption text-muted-foreground">2025-02-28 · 김민수 · 89 views</span>
              </TableMobileItem>
              <TableMobileItem>
                <span>족발 같이 시켜먹을 사람</span>
                <span className="type-caption text-muted-foreground">2025-02-27 · 이서연 · 156 views</span>
              </TableMobileItem>
              <TableMobileItem>
                <span>기숙사 계약 관련 질문</span>
                <span className="type-caption text-muted-foreground">2025-02-26 · 박지훈 · 67 views</span>
              </TableMobileItem>
            </TableMobileList>
          </div>
        </div>
      </ComponentPreview>

      {/* -- API Reference -------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Table is composed from several sub-components that you assemble together.
        All sub-components accept a{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">className</code>{' '}
        prop plus native HTML attributes for the element they wrap. Your custom
        classes are merged with built-in defaults using Tailwind&#39;s class merge
        utility, so you can safely override any default style.
      </p>

      {/* Table */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Table</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Root component wrapping a native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;table&gt;</code>{' '}
        inside an overflow scroll container.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Prop</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Default</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">TableHeader, TableBody, TableFooter, and TableCaption children.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merged via cn().</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* TableHeader */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">TableHeader</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Wraps a native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;thead&gt;</code>{' '}
        with a bottom border.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Prop</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Default</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">TableRow children containing TableHead cells.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merged via cn().</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* TableBody */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">TableBody</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Wraps a native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;tbody&gt;</code>{' '}
        with divided rows.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Prop</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Default</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">TableRow children containing TableCell cells.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merged via cn().</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* TableRow */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">TableRow</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Wraps a native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;tr&gt;</code>{' '}
        with a hover highlight.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Prop</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Default</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">TableHead or TableCell children.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merged via cn().</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* TableHead */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">TableHead</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Header cell wrapping a native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;th&gt;</code>.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Prop</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Default</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Header label text.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merged via cn().</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* TableCell */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">TableCell</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Body cell wrapping a native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;td&gt;</code>.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Prop</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Default</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Cell content.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merged via cn().</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* TableCaption */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">TableCaption</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Wraps a native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;caption&gt;</code>{' '}
        for an accessible table description.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Prop</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Default</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Caption text describing the table.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merged via cn().</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* TableFooter */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">TableFooter</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Wraps a native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;tfoot&gt;</code>{' '}
        for summary or totals rows with a subtle background.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Prop</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Default</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">TableRow children with summary cells.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merged via cn().</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* TableMobileList */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">TableMobileList</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Wraps a native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;ol&gt;</code>{' '}
        as a mobile-friendly list container, replacing the table on small viewports.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Prop</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Default</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">TableMobileItem children.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merged via cn().</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* TableMobileItem */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">TableMobileItem</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Wraps a native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;li&gt;</code>{' '}
        with a stacked flex layout for mobile list items.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Prop</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Default</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Primary text and metadata spans.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merged via cn().</td>
            </tr>
          </tbody>
        </table>
      </div>

    </Container>
  )
}
