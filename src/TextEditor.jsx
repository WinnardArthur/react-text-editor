import React, { useCallback } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { FaBold, FaItalic, FaStrikethrough, FaUnderline, FaListOl, FaListUl, FaQuoteLeft, FaRedo, FaUndo, FaImage } from 'react-icons/fa';
import { MdOutlineHorizontalRule } from 'react-icons/md' 
import Image from '@tiptap/extension-image';


function TextEditor({ setDesc }) {
    const MenuBar = ({ editor }) => {
        if (!editor) {
            return null;
        }
    
        return (
            <div className='menu-bar'>
                <div>
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={!editor.can().chain().focus().toggleBold().run()}
                        className={editor.isActive('bold') ? 'is-active' : ''}
                    >
                        <FaBold />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={!editor.can().chain().focus().toggleItalic().run()}
                        className={editor.isActive('italic') ? 'is-active' : ''}
                    >
                        <FaItalic /> 
                    </button>
                    <button 
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={editor.isActive('underline') ? 'is-active' : ''}
                    >
                        <FaUnderline />
                    </button>
                    <button 
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={editor.isActive('strike') ? 'is-active' : ''}
                    >
                        <FaStrikethrough />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1}).run()}
                        className={editor.isActive('heading', { level: 1}) ? 'is-active' : ''}
                    >
                        h1
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                        className={editor.isActive('heading', { level: 2}) ? 'is-active' : ''}
                    >
                        h2
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'is-active' : ''}
                    >
                        <FaListUl />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={editor.isActive('orderedList') ? 'is-active' : ''}
                    >
                        <FaListOl />
                    </button>
                    <button 
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={editor.isActive('blockquote') ? 'is-active' : ''}
                    >
                        <FaQuoteLeft />
                    </button>
                    <button onClick={addImage}>
                        <FaImage />
                    </button>
                    <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                        <MdOutlineHorizontalRule />
                    </button>
                </div>
    
                <div>
                    <button 
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={
                            !editor.can()
                              .chain()
                              .focus()
                              .undo()
                              .run()
                          }
                    >
                        <FaUndo />
                    </button>
                    <button onClick={() => editor.chain().focus().redo().run()}>
                        <FaRedo />
                    </button>
                </div>
            </div>
        )
    }
    
    const editor = useEditor({
        extensions: [
            StarterKit, Underline, Image
        ],
        content: '',
        onUpdate: ({editor}) => {
            const data1 = editor.getHTML();
            const data2 = editor.getJSON();

            setDesc(data1)
        }
    })

    const addImage = useCallback(() => {
        const url = window.prompt('URL');
    
        if (url) {
            editor.chain().focus().setImage({src: url}).run()
        }
    }, [editor])

  return (
    <div className='text-editor'>
        <MenuBar editor={editor}/>
        <EditorContent editor={editor} />
    </div>
  )
}

export default TextEditor