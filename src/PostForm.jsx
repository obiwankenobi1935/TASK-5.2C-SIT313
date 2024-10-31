import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import ReactMarkdown from 'react-markdown';
import './PostForm.css';

// Import CodeMirror styles and mode
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown';

const PostForm = () => {
  const [postType, setPostType] = useState('Article');
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [content, setContent] = useState('');
  const [code, setCode] = useState('');
  const [tags, setTags] = useState('');

  const handlePostTypeChange = (event) => {
    setPostType(event.target.value);
    if (event.target.value === 'Article') {
      setCode(''); // Clear code when switching to Article
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear fields
    setTitle('');
    setAbstract('');
    setContent('');
    setCode('');
    setTags('');
    alert('Form submitted!');
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2>Create New {postType}</h2>

      <div className="post-type">
        <label>Post Type:</label>
        <input
          type="radio"
          name="postType"
          value="Question"
          checked={postType === 'Question'}
          onChange={handlePostTypeChange}
        /> Question
        <input
          type="radio"
          name="postType"
          value="Article"
          checked={postType === 'Article'}
          onChange={handlePostTypeChange}
        /> Article
      </div>

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Abstract</label>
        <textarea
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      {postType === 'Question' && (
        <div className="form-group">
          <label>Code (if any):</label>
          <CodeMirror
            value={code}
            options={{
              mode: 'markdown',
              theme: 'default',
              lineNumbers: true,
            }}
            onBeforeChange={(editor, data, value) => setCode(value)}
          />
        </div>
      )}

      <div className="form-group">
        <label>Tags (comma-separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <button type="submit">Submit</button>

      {/* Markdown Preview */}
      <div className="preview-section">
        <h3>Preview:</h3>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </form>
  );
};

export default PostForm;
