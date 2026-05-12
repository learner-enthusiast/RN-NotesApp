import { BorderRadius, Colors, Spacing, Typography } from '@/constants/theme'
import { Note } from '@/types'
import React, { useState } from 'react'
import {
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    useWindowDimensions,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface NoteEditorScreenProps {
    note?: Note
    onSave?: (id: string, title: string, content: string) => void
    onBack?: () => void
    isDark: boolean
}

export const NoteEditorScreen: React.FC<NoteEditorScreenProps> = ({
    note,
    onSave,
    onBack,
    isDark,
}) => {
    const windowDimensions = useWindowDimensions()
    const colors = isDark ? Colors.dark : Colors.light

    const [title, setTitle] = useState(note?.title || '')
    const [content, setContent] = useState(note?.content || '')

    const isTablet = windowDimensions.width > 600
    const contentWidth = isTablet
        ? windowDimensions.width * 0.7
        : windowDimensions.width
    const handleSave = () => {
        if (title.trim()) {
            const noteId =
                note?.id ??
                `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
            onSave?.(noteId, title, content)
        }
    }

    // Create a gradient-like background using a simple color background
    const headerBackgroundColor = isDark ? '#1C1C1E' : '#007AFF'

    // Use StyleSheet.flatten to combine multiple style objects
    const composedInputStyle = StyleSheet.flatten([
        styles.input,
        {
            backgroundColor: colors.surface,
            color: colors.text,
            borderColor: colors.border,
        },
    ])

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
            >
                {/* Header with ImageBackground */}
                <ImageBackground
                    source={{
                        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkrbHkEgKUAyuwHoy97piAKHXayuwYJy00FA&s',
                    }}
                    style={[
                        styles.header,
                        { backgroundColor: headerBackgroundColor },
                    ]}
                    resizeMode="cover"
                >
                    <View style={styles.headerContent}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.button,
                                styles.backButton,
                                {
                                    backgroundColor: isDark
                                        ? colors.surface
                                        : 'rgba(255, 255, 255, 0.2)',
                                    opacity: pressed ? 0.7 : 1,
                                },
                            ]}
                            onPress={onBack}
                        >
                            <Text
                                style={[
                                    styles.buttonText,
                                    { color: isDark ? colors.text : '#FFFFFF' },
                                ]}
                            >
                                ← Back
                            </Text>
                        </Pressable>

                        <Text
                            style={[
                                styles.headerTitle,
                                { color: isDark ? colors.text : '#FFFFFF' },
                                Typography.h3,
                            ]}
                        >
                            {note ? 'Edit Note' : 'New Note'}
                        </Text>

                        <Pressable
                            style={({ pressed }) => [
                                styles.button,
                                styles.saveButton,
                                {
                                    backgroundColor: colors.accent,
                                    opacity: pressed ? 0.8 : 1,
                                    opacity: !title.trim()
                                        ? 0.5
                                        : pressed
                                          ? 0.8
                                          : 1,
                                },
                            ]}
                            onPress={handleSave}
                            disabled={!title.trim()}
                        >
                            <Text
                                style={[
                                    styles.buttonText,
                                    {
                                        color: isDark
                                            ? colors.background
                                            : '#FFFFFF',
                                    },
                                    Typography.captionBold,
                                ]}
                            >
                                Save
                            </Text>
                        </Pressable>
                    </View>
                </ImageBackground>

                {/* Content Area */}
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={[
                        styles.scrollContent,
                        { width: isTablet ? contentWidth : '100%' },
                    ]}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Title Input */}
                    <View style={styles.inputGroup}>
                        <Text
                            style={[
                                styles.label,
                                { color: colors.textSecondary },
                                Typography.captionBold,
                            ]}
                        >
                            TITLE
                        </Text>
                        <TextInput
                            style={[
                                styles.titleInput,
                                composedInputStyle,
                                Typography.h3,
                            ]}
                            placeholder="Enter note title..."
                            placeholderTextColor={colors.textTertiary}
                            value={title}
                            onChangeText={setTitle}
                            maxLength={100}
                        />
                    </View>

                    {/* Content Input */}
                    <View style={styles.inputGroup}>
                        <Text
                            style={[
                                styles.label,
                                { color: colors.textSecondary },
                                Typography.captionBold,
                            ]}
                        >
                            CONTENT
                        </Text>
                        <TextInput
                            style={[styles.contentInput, composedInputStyle]}
                            placeholder="Start typing your note..."
                            placeholderTextColor={colors.textTertiary}
                            value={content}
                            onChangeText={setContent}
                            multiline
                            textAlignVertical="top"
                            scrollEnabled={true}
                        />
                    </View>

                    {/* Character Counter */}
                    <View style={styles.counter}>
                        <Text
                            style={[
                                styles.counterText,
                                { color: colors.textTertiary },
                                Typography.small,
                            ]}
                        >
                            {title.length}/100 characters
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    header: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.lg,
        paddingTop: Spacing.md,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: Spacing.md,
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
    },
    button: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.md,
        minWidth: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: {
        minWidth: 'auto',
    },
    saveButton: {
        minWidth: 70,
    },
    buttonText: {
        fontWeight: '600',
        fontSize: 14,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.xl,
        gap: Spacing.lg,
        alignSelf: 'center',
    },
    inputGroup: {
        gap: Spacing.sm,
    },
    label: {
        letterSpacing: 0.5,
    },
    input: {
        borderWidth: 1,
        borderRadius: BorderRadius.lg,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.md,
    },
    titleInput: {
        minHeight: 60,
        paddingVertical: Spacing.md,
    },
    contentInput: {
        minHeight: 300,
        paddingVertical: Spacing.md,
    },
    counter: {
        alignItems: 'flex-end',
        paddingHorizontal: Spacing.md,
        marginTop: Spacing.md,
    },
    counterText: {
        textAlign: 'right',
    },
})
