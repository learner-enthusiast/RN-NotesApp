import { MOCK_NOTES } from '@/constants/mockData'
import { NoteEditorScreen } from '@/screens/NoteEditorScreen'
import { NotesListScreen } from '@/screens/NotesListScreen'
import { Note } from '@/types'
import React, { useState } from 'react'
import { StyleSheet, useColorScheme, View } from 'react-native'

type Screen = 'list' | 'editor'

export const AppContainer: React.FC = () => {
    const [currentScreen, setCurrentScreen] = useState<Screen>('list')
    const [selectedNote, setSelectedNote] = useState<Note | undefined>()
    const [newNote, setNewNote] = useState<boolean>()
    const [notes, setNotes] = useState<Note[]>(MOCK_NOTES)

    const handleNotePress = (note: Note) => {
        setSelectedNote(note)
        setCurrentScreen('editor')
    }
    const handleAddNode = () => {
        setCurrentScreen('editor')
        setNewNote(true)
    }
    const handleSave = (id: string, title: string, content: string) => {
        setNotes((prev) => {
            const existingIndex = prev.findIndex((note) => note.id === id)

            const noteToSave = {
                id,
                title,
                content,
                createdAt:
                    existingIndex >= 0
                        ? prev[existingIndex].createdAt
                        : new Date(),
                updatedAt: new Date(),
            }

            if (existingIndex >= 0) {
                return prev.map((note) => (note.id === id ? noteToSave : note))
            }

            return [noteToSave, ...prev]
        })

        setSelectedNote(undefined)
        setCurrentScreen('list')
    }

    const handleBack = () => {
        setCurrentScreen('list')
        setSelectedNote(undefined)
    }
    const colorScheme = useColorScheme()
    const isDark = colorScheme === 'dark'
    const [isDarkMode, setIsDarkMode] = useState(isDark)
    return (
        <View style={styles.container}>
            {currentScreen === 'list' ? (
                <NotesListScreen
                    onNotePress={handleNotePress}
                    isDark={isDarkMode}
                    setIsDarkMode={setIsDarkMode}
                    notes={notes}
                    handleAddNode={handleAddNode}
                />
            ) : (
                <NoteEditorScreen
                    note={selectedNote}
                    onSave={handleSave}
                    onBack={handleBack}
                    isDark={isDarkMode}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
