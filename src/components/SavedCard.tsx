import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, radius } from '../theme/tokens';
import { bookmarks } from '../store/bookmarks';
import BookmarkIcon from './icons/BookmarkIcon';
import MenuIcon from './icons/MenuIcon';
import NoteIcon from './icons/NoteIcon';
import { useTheme } from '../theme/ThemeContext';

interface SavedCardProps {
  item: any;
  onUpdate?: () => void;
}

export default function SavedCard({ item, onUpdate }: SavedCardProps) {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [noteText, setNoteText] = useState(item.note || '');

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Risk':
        return colors.risk;
      case 'Opportunity':
        return colors.oppty;
      case 'Neutral':
        return colors.neutral;
      default:
        return colors.neutral;
    }
  };

  const getTagTextColor = (tag: string) => {
    return tag === 'Opportunity' ? '#FFFFFF' : theme.colors.textPrimary;
  };

  const handleBookmarkPress = (e: any) => {
    e.stopPropagation();
    bookmarks.toggle(item);
    onUpdate?.();
  };

  const handleMenuPress = (e: any) => {
    e.stopPropagation();
    setMenuVisible(!menuVisible);
  };

  const handleTagSelect = (tag: string, e: any) => {
    e.stopPropagation();
    bookmarks.updateTag(item, tag);
    setMenuVisible(false);
    onUpdate?.();
  };

  const handleNoteIconPress = (e: any) => {
    e.stopPropagation();
    setNoteText(item.note || '');
    setNoteModalVisible(true);
  };

  const handleSaveNote = () => {
    bookmarks.updateNote(item, noteText);
    setNoteModalVisible(false);
    onUpdate?.();
  };

  const handleCloseNoteModal = () => {
    setNoteModalVisible(false);
    setNoteText(item.note || '');
  };

  // Format date from "2h ago" to "Oct 12" format
  const formatDate = () => {
    const date = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate() - Math.floor(Math.random() * 7); // Random day for variety
    return `${month} ${day}`;
  };

  // Mock read time
  const readTime = `${Math.floor(Math.random() * 10) + 3} min read`;

  return (
    <>
      <Pressable
        onPress={() => {
          if (menuVisible) {
            setMenuVisible(false);
          } else {
            navigation.navigate('Insight', { item });
          }
        }}
      >
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <View style={styles.tagsContainer}>
              <View style={[styles.tagBadge, { backgroundColor: getTagColor(item.tag) }]}>
                <Text style={[styles.tagText, { color: getTagTextColor(item.tag) }]}>
                  {item.tag}
                </Text>
              </View>
              <Text style={[styles.sectorTag, { color: theme.colors.textSecondary }]}>{item.sector}</Text>
            </View>
            <View style={styles.actionsContainer}>
              <Pressable onPress={handleNoteIconPress} style={styles.actionButton}>
                <NoteIcon 
                  color={item.note ? theme.colors.primary : theme.colors.textSecondary} 
                  size={20} 
                  filled={!!item.note}
                />
              </Pressable>
              <Pressable onPress={handleMenuPress} style={styles.actionButton}>
                <MenuIcon color={theme.colors.textSecondary} size={20} />
              </Pressable>
              <Pressable onPress={handleBookmarkPress} style={styles.actionButton}>
                <BookmarkIcon color={theme.colors.textSecondary} size={20} />
              </Pressable>
            </View>
          </View>

          {menuVisible && (
            <View style={[styles.menuDropdown, { backgroundColor: theme.colors.background, borderColor: theme.colors.border }]}>
              {(['Risk', 'Opportunity', 'Neutral'] as const).map((tag) => (
                <Pressable
                  key={tag}
                  onPress={(e) => handleTagSelect(tag, e)}
                  style={[
                    styles.menuItem,
                    item.tag === tag && { backgroundColor: getTagColor(tag) + '20' }
                  ]}
                >
                  <Text
                    style={[
                      styles.menuItemText,
                      { color: item.tag === tag ? getTagColor(tag) : theme.colors.textPrimary }
                    ]}
                  >
                    {tag}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}

          <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{item.title}</Text>
          <Text style={[styles.summary, { color: theme.colors.textSecondary }]} numberOfLines={2}>
            {item.summary}
          </Text>

          {item.note && (
            <View style={[styles.noteContainer, { backgroundColor: theme.colors.background, borderColor: theme.colors.border }]}>
              <Text style={[styles.noteLabel, { color: theme.colors.textSecondary }]}>Note:</Text>
              <Text style={[styles.noteText, { color: theme.colors.textPrimary }]}>{item.note}</Text>
            </View>
          )}

          <View style={styles.footerRow}>
            <Text style={[styles.meta, { color: theme.colors.textSecondary }]}>
              {item.source} • {formatDate()} • {readTime}
            </Text>
          </View>
        </View>
      </Pressable>

      <Modal
        visible={noteModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseNoteModal}
      >
        <Pressable style={styles.modalOverlay} onPress={handleCloseNoteModal}>
          <Pressable style={[styles.modalContent, { backgroundColor: theme.colors.background }]} onPress={(e) => e.stopPropagation()}>
            <Text style={[styles.modalTitle, { color: theme.colors.textPrimary }]}>Add Note</Text>
            <TextInput
              style={[
                styles.noteInput,
                {
                  color: theme.colors.textPrimary,
                  backgroundColor: theme.colors.surface || theme.colors.background,
                  borderColor: theme.colors.border,
                }
              ]}
              placeholder="Enter your note..."
              placeholderTextColor={theme.colors.textSecondary}
              multiline
              numberOfLines={4}
              value={noteText}
              onChangeText={setNoteText}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <Pressable
                onPress={handleCloseNoteModal}
                style={[styles.modalButton, styles.cancelButton, { borderColor: theme.colors.border }]}
              >
                <Text style={[styles.modalButtonText, { color: theme.colors.textSecondary }]}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={handleSaveNote}
                style={[styles.modalButton, styles.saveButton, { backgroundColor: theme.colors.primary }]}
              >
                <Text style={[styles.modalButtonText, { color: '#FFFFFF' }]}>Save</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    paddingBottom: spacing.lg,
    marginBottom: spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  tagBadge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  sectorTag: {
    fontSize: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  actionButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmark: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuDropdown: {
    position: 'absolute',
    top: 30,
    right: 0,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingVertical: spacing.xs,
    minWidth: 120,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '500',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.xs,
    lineHeight: 22,
  },
  summary: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  noteContainer: {
    padding: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: 1,
    marginBottom: spacing.sm,
  },
  noteLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: spacing.xs / 2,
  },
  noteText: {
    fontSize: 14,
    lineHeight: 20,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meta: {
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  noteInput: {
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: 14,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: spacing.md,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
  modalButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    minWidth: 80,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
  },
  saveButton: {
    // backgroundColor set inline
  },
  modalButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

