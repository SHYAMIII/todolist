// app/page.js

import TodoList from '@/components/TodoList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8 text-center animate-fade-in">
          Aesthetic Todo List
        </h1>
        <TodoList />
      </div>
    </main>
  );
}