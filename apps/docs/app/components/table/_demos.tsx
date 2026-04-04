'use client'

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@umichkisa-ds/web'

export function ClickableRowsDemo() {
  return (
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
          <TableRow className="cursor-pointer" onClick={() => alert('Navigating to post 5')}>
            <TableCell>5</TableCell>
            <TableCell>겨울방학 스터디 모집합니다</TableCell>
            <TableCell>김민수</TableCell>
            <TableCell>2025-02-28</TableCell>
            <TableCell>89</TableCell>
          </TableRow>
          <TableRow className="cursor-pointer" onClick={() => alert('Navigating to post 4')}>
            <TableCell>4</TableCell>
            <TableCell>족발 같이 시켜먹을 사람</TableCell>
            <TableCell>이서연</TableCell>
            <TableCell>2025-02-27</TableCell>
            <TableCell>156</TableCell>
          </TableRow>
          <TableRow className="cursor-pointer" onClick={() => alert('Navigating to post 3')}>
            <TableCell>3</TableCell>
            <TableCell>기숙사 계약 관련 질문</TableCell>
            <TableCell>박지훈</TableCell>
            <TableCell>2025-02-26</TableCell>
            <TableCell>67</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
