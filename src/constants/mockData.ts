import { Note } from '@/types'

export const MOCK_NOTES: Note[] = [
    {
        id: '1',
        title: 'React Native Tips',
        content:
            'Remember to use StyleSheet.create for performance. Always optimize re-renders with useMemo and useCallback...',
        createdAt: new Date('2024-05-10'),
        updatedAt: new Date('2024-05-10'),
    },
    {
        id: '2',
        title: 'Project Ideas',
        content:
            'Build a todo list app, weather app, notes application, expense tracker, or a meditation timer with animations...',
        createdAt: new Date('2024-05-09'),
        updatedAt: new Date('2024-05-09'),
    },
    {
        id: '3',
        title: 'UI/UX Principles',
        content:
            'Consistency, clarity, and user feedback are key. Make sure your app has proper spacing and visual hierarchy...',
        createdAt: new Date('2024-05-08'),
        updatedAt: new Date('2024-05-08'),
    },
    {
        id: '4',
        title: 'Meeting Notes',
        content:
            'Discussed new feature roadmap. Sprint planning for next two weeks. Team morale is high and productivity is increasing...',
        createdAt: new Date('2024-05-07'),
        updatedAt: new Date('2024-05-07'),
    },
    {
        id: '5',
        title: 'Learning Goals',
        content:
            'Master React Native animations, learn TypeScript deeply, understand mobile UX patterns, and build real projects...',
        createdAt: new Date('2024-05-06'),
        updatedAt: new Date('2024-05-06'),
    },
]
