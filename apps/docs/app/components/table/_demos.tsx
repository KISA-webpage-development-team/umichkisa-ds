'use client'

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableMobileList,
  TableMobileItem,
} from '@umichkisa-ds/web'

const posts = [
  { id: 5, title: '겨울방학 스터디 모집합니다', author: '김민수', date: '2025-02-28', views: 89 },
  { id: 4, title: '족발 같이 시켜먹을 사람', author: '이서연', date: '2025-02-27', views: 156 },
  { id: 3, title: '기숙사 계약 관련 질문', author: '박지훈', date: '2025-02-26', views: 67 },
]

export function ClickableRowsDemo() {
  return (
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
            {posts.map((post) => (
              <TableRow
                key={post.id}
                className="cursor-pointer"
                onClick={() => alert(`Navigating to post ${post.id}`)}
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
              onClick={() => alert(`Navigating to post ${post.id}`)}
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
      </div>
    </div>
  )
}
