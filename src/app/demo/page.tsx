'use client';

import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

type UserType = {
    uid: number;
    name: string;
};

type DataType = {
    user: UserType;
    english: number;
    maths: number;
};

const data: DataType[] = [
    {
        user: {
            uid: 1,
            name: 'Sura',
        },
        english: 78,
        maths: 20,
    },
    {
        user: {
            uid: 2,
            name: 'Rag',
        },
        english: 30,
        maths: 26,
    },
    {
        user: {
            uid: 3,
            name: 'Bila',
        },
        english: 40,
        maths: 67,
    },
    {
        user: {
            uid: 4,
            name: 'Viki',
        },
        english: 80,
        maths: 97,
    },
    {
        user: {
            uid: 5,
            name: 'Page',
        },
        english: 63,
        maths: 32,
    },
];

const columns: ColumnDef<DataType>[] = [
    {
        accessorKey: 'user',
        header: 'Name',
        cell: ({ row }) => {
            return <div>{row.original.user.name}</div>;
        },
    },
    {
        accessorKey: 'english',
        header: 'English',
    },
    {
        accessorKey: 'maths',
        header: 'Maths',
    },
];

export default function DemoPage() {
    return (
        <div className='w-1/2'>
            <DataTable columns={columns} data={data} searchKey='english' />
        </div>
    );
}
