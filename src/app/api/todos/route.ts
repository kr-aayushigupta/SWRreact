import { NextResponse } from 'next/server'

const todos = []

export async function GET() {
  return NextResponse.json(todos)
}

export async function POST(req: Request) {
  const { task } = await req.json()
  const newTodo = { id: Date.now(), task }
  todos.push(newTodo)
  return NextResponse.json(newTodo)
}


