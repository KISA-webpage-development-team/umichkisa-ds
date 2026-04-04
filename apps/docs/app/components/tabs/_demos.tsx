'use client'

import { useState } from 'react'
import { Container, Tabs, TabsList, TabsTrigger, TabsContent, FormItem, Input } from '@umichkisa-ds/web'

export function ControlledDemo() {
  const [activeTab, setActiveTab] = useState('members')

  return (
    <Container size="sm">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="invites">Invites</TabsTrigger>
        </TabsList>
        <TabsContent value="members">
          <FormItem htmlFor="ctrl-search" label="Search members"><Input id="ctrl-search" placeholder="Search by name" /></FormItem>
        </TabsContent>
        <TabsContent value="roles">
          <FormItem htmlFor="ctrl-role" label="Role name"><Input id="ctrl-role" placeholder="Admin" /></FormItem>
        </TabsContent>
        <TabsContent value="invites">
          <FormItem htmlFor="ctrl-email" label="Email address"><Input id="ctrl-email" placeholder="user@example.com" /></FormItem>
        </TabsContent>
      </Tabs>
      <p className="type-body-sm text-muted-foreground mt-3">
        Active tab: <span className="text-foreground">{activeTab}</span>
      </p>
    </Container>
  )
}
