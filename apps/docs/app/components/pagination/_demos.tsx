'use client'

import { useState } from 'react'
import { Pagination } from '@umichkisa-ds/web'

export function BasicDemo() {
  const [page, setPage] = useState(1)

  return (
    <Pagination
      page={page}
      totalPages={10}
      onPageChange={setPage}
    />
  )
}

export function ManyPagesDemo() {
  const [page, setPage] = useState(25)

  return (
    <Pagination
      page={page}
      totalPages={49}
      onPageChange={setPage}
    />
  )
}

export function SiblingCountDemo() {
  const [page, setPage] = useState(15)

  return (
    <Pagination
      page={page}
      totalPages={30}
      onPageChange={setPage}
      siblingCount={2}
    />
  )
}

export function FewPagesDemo() {
  const [page, setPage] = useState(1)

  return (
    <Pagination
      page={page}
      totalPages={3}
      onPageChange={setPage}
    />
  )
}
