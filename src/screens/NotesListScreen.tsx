import { BorderRadius, Colors, Spacing, Typography } from '@/constants/theme'
import { Note } from '@/types'
import React, { useMemo, useState } from 'react'
import {
    FlatList,
    Pressable,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    useWindowDimensions,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface NotesListScreenProps {
    onNotePress?: (note: Note) => void
    onThemeToggle?: (isDark: boolean) => void
    isDark: boolean
    setIsDarkMode: () => void
    notes: Note[]
}

export const NotesListScreen: React.FC<NotesListScreenProps> = ({
    onNotePress,
    onThemeToggle,
    isDark,
    setIsDarkMode,
    notes,
    handleAddNode,
}) => {
    const windowDimensions = useWindowDimensions()

    const [searchQuery, setSearchQuery] = useState('')

    const colors = isDark ? Colors.dark : Colors.light

    const isTablet = windowDimensions.width > 600
    const contentWidth = isTablet
        ? windowDimensions.width * 0.7
        : windowDimensions.width

    // Filter notes based on search query
    const filteredNotes = useMemo(() => {
        return notes.filter(
            (note) =>
                note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                note.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [searchQuery, notes])

    const handleThemeToggle = (value: boolean) => {
        setIsDarkMode(value)
        onThemeToggle?.(value)
    }

    const formatDate = (date: Date) => {
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)

        if (date.toDateString() === today.toDateString()) {
            return date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            })
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday'
        } else {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
            })
        }
    }

    const renderNoteCard = ({ item }: { item: Note }) => (
        <Pressable
            style={({ pressed }) => [
                styles.noteCard,
                {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    opacity: pressed ? 0.7 : 1,
                },
                StyleSheet.compose(styles.noteCardBase, {
                    shadowColor: colors.shadow,
                }),
            ]}
            onPress={() => onNotePress?.(item)}
        >
            <View style={styles.noteCardContent}>
                <Text
                    style={[
                        styles.noteTitle,
                        { color: colors.text },
                        Typography.bodyBold,
                    ]}
                    numberOfLines={2}
                >
                    {item.title}
                </Text>

                <Text
                    style={[
                        styles.notePreview,
                        { color: colors.textSecondary },
                        Typography.caption,
                    ]}
                    numberOfLines={2}
                >
                    {item.content}
                </Text>
            </View>

            <Text
                style={[
                    styles.noteDate,
                    { color: colors.textTertiary },
                    Typography.small,
                ]}
            >
                {formatDate(item.updatedAt)}
            </Text>
        </Pressable>
    )

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            {/* Header with Theme Toggle */}
            <View
                style={[styles.header, { borderBottomColor: colors.divider }]}
            >
                <View style={styles.headerContent}>
                    <Text
                        style={[
                            styles.headerTitle,
                            { color: colors.text },
                            Typography.h2,
                        ]}
                    >
                        Notes
                    </Text>
                    <View style={styles.themeToggle}>
                        <Text
                            style={[
                                styles.themeLabel,
                                { color: colors.textSecondary },
                                Typography.caption,
                            ]}
                        >
                            Dark
                        </Text>
                        <Switch
                            value={isDark}
                            onValueChange={handleThemeToggle}
                            trackColor={{
                                false: colors.surface2,
                                true: colors.primary,
                            }}
                            thumbColor={colors.background}
                            style={styles.switch}
                        />
                    </View>
                </View>

                {/* Search Input */}
                <View style={[styles.searchContainer, { width: contentWidth }]}>
                    <TextInput
                        style={[
                            styles.searchInput,
                            {
                                backgroundColor: colors.surface2,
                                color: colors.text,
                                borderColor: colors.border,
                            },
                            Typography.body,
                        ]}
                        placeholder="Search notes..."
                        placeholderTextColor={colors.textTertiary}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>
            <Pressable style={styles.addNote} onPress={handleAddNode}>
                <Text style={[Typography.h1, { color: '#ffffff' }]}>
                    Add Note
                </Text>
            </Pressable>
            {/* Notes List */}
            <FlatList
                data={filteredNotes}
                renderItem={renderNoteCard}
                keyExtractor={(item) => item.id}
                contentContainerStyle={[
                    styles.listContainer,
                    { width: isTablet ? contentWidth : '100%' },
                ]}
                scrollIndicatorInsets={{ right: 1 }}
                ListEmptyStateComponent={
                    <View style={styles.emptyState}>
                        <Text
                            style={[
                                styles.emptyStateText,
                                { color: colors.textSecondary },
                                Typography.body,
                            ]}
                        >
                            {searchQuery
                                ? 'No notes found'
                                : 'No notes yet. Create one!'}
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.lg,
        paddingBottom: Spacing.md,
        borderBottomWidth: 1,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    headerTitle: {
        flex: 1,
    },
    themeToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    themeLabel: {
        marginRight: Spacing.xs,
    },
    switch: {
        transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
    },
    searchContainer: {
        alignSelf: 'center',
    },
    searchInput: {
        height: 44,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderWidth: 1,
    },
    listContainer: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.lg,
        gap: Spacing.md,
    },
    noteCardBase: {
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
    },
    noteCard: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    noteCardContent: {
        flex: 1,
        marginRight: Spacing.md,
    },
    noteTitle: {
        marginBottom: Spacing.xs,
    },
    notePreview: {
        marginBottom: Spacing.xs,
    },
    noteDate: {
        minWidth: 50,
        textAlign: 'right',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 200,
    },
    emptyStateText: {
        textAlign: 'center',
    },
    addNote: {
        paddingVertical: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
    },
})
