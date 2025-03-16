import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import App from './App.tsx';
import Home from './pages/Home.tsx';
import Editor from './pages/Editor.tsx';
import Library from './pages/Library.tsx';
import Login from './pages/Login.tsx';
import Scenes from './pages/Scenes.tsx';
import Story from './pages/Story.tsx';
import NewProject from './pages/NewProject.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="editor" element={<Editor />} />
          <Route path="library" element={<Library />} />
          <Route path="login" element={<Login />} />
          <Route path="scenes" element={<Scenes />} />
          <Route path="story" element={<Story />} />
          <Route path="new-project" element={<NewProject />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
