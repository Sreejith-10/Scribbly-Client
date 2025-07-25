'use client';

import type React from 'react';

import { useState, useRef } from 'react';

interface User {
  id: string;
  name: string;
  color: string;
  cursor: { x: number; y: number };
  isActive: boolean;
}

export default function LobbyPage() {
  return (
    <div>
      <CollaborativeBoard />
    </div>
  );
}

function CollaborativeBoard() {
  const boardRef = useRef<HTMLDivElement>(null);
  const [users, setUsers] = useState<User>({
    id: '1',
    name: 'Alice',
    color: '#FF6B6B',
    cursor: { x: 200, y: 150 },
    isActive: true,
  });

  // Handle mouse movement for current user
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!boardRef.current) return;

    const rect = boardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setUsers((prevUsers) => ({ ...prevUsers, cursor: { x, y } }));
  };

  return (
    <div className='min-h-screen p-4'>
      <div
        className='relative min-h-screen w-full cursor-none bg-white'
        onMouseMove={handleMouseMove}
      ></div>
    </div>
  );
}
