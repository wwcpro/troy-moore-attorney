"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SidePanel, { type PanelItem } from "@/components/SidePanel";
import PageCTA from "@/components/PageCTA";
import { gsap } from "@/lib/gsap";

const openTalkToTroy = (e: React.MouseEvent) => {
  e.preventDefault();
  window.dispatchEvent(new CustomEvent("open-talk-to-troy"));
};

/* ─── Layout constants ───────────────────────────────────────────── */
const PAD: React.CSSProperties = {
  paddingTop: "clamp(4rem, 6vw, 7rem)",
  paddingBottom: "clamp(4rem, 6vw, 7rem)",
};
const WRAP: React.CSSProperties = {
  paddingLeft: "10vw",
  paddingRight: "10vw",
};

/* ─── Intro section icons ────────────────────────────────────────── */
const ABOUT_ICONS = [
  `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m149.214 459.24h-.114c-4.142 0-7.499 3.357-7.499 7.499s3.358 7.499 7.499 7.499h.113c4.142 0 7.499-3.357 7.499-7.499.001-4.142-3.357-7.499-7.498-7.499z"></path><path d="m149.236 389.168c-.007 0-.015 0-.022 0-4.131 0-7.486 3.343-7.499 7.477l-.113 38.605c-.012 4.142 3.336 7.51 7.477 7.522h.022c4.131 0 7.486-3.343 7.499-7.477l.113-38.605c.012-4.142-3.336-7.51-7.477-7.522z"></path><path d="m209.82 316.138 22.014 9.314c-.64 4.806-.034 9.717 1.836 14.328 2.84 6.998 8.235 12.465 15.177 15.387 3.543 1.501 7.274 2.252 11.008 2.252 3.595 0 7.192-.697 10.624-2.091 6.997-2.842 12.464-8.241 15.385-15.181 3.468-8.167 2.767-17.074-1.132-24.355l41.031-40.267c2.956-2.9 3.001-7.649.1-10.604-2.901-2.958-7.649-3.003-10.605-.1l-40.862 40.101c-1.117-.671-2.288-1.277-3.521-1.8-.002-.001-.004-.002-.007-.003-6.955-2.945-14.64-3.004-21.64-.159-4.611 1.873-8.555 4.862-11.557 8.676l-22.007-9.311c-3.815-1.612-8.214.17-9.828 3.984-1.614 3.815.169 8.215 3.984 9.829zm45.053.718c1.611-.654 3.298-.981 4.985-.981 1.75 0 3.5.352 5.16 1.056 6.731 2.863 9.89 10.646 7.031 17.376-1.373 3.263-3.936 5.794-7.215 7.126-3.279 1.331-6.879 1.305-10.153-.083-3.257-1.37-5.783-3.93-7.113-7.208-1.331-3.282-1.307-6.891.063-10.145v-.001c0-.001 0-.001.001-.001 1.385-3.271 3.956-5.806 7.241-7.139z"></path><path d="m383.262 38.134c.997.447 2.04.659 3.066.659 2.863 0 5.598-1.649 6.846-4.43l10.678-23.792c1.696-3.779.008-8.217-3.771-9.913-3.777-1.693-8.217-.006-9.912 3.771l-10.678 23.792c-1.696 3.779-.008 8.217 3.771 9.913z"></path><path d="m399.8 60.154c1.138 2.996 3.987 4.838 7.012 4.838.885 0 1.785-.158 2.661-.49l24.386-9.262c3.872-1.471 5.818-5.802 4.348-9.674-1.471-3.872-5.799-5.816-9.673-4.348l-24.386 9.262c-3.872 1.471-5.819 5.803-4.348 9.674z"></path><path d="m346.131 36.057c1.14 2.992 3.987 4.831 7.009 4.831.887 0 1.79-.158 2.668-.493 3.87-1.474 5.813-5.807 4.338-9.678l-9.29-24.387c-1.474-3.87-5.807-5.814-9.678-4.338-3.87 1.474-5.813 5.807-4.338 9.678z"></path><path d="m429.193 260.41c-10.448-25.707-26.701-48.838-47.176-67.213l13.062-30.901c2.111-4.984 2.148-10.496.105-15.521-2.039-5.016-5.905-8.939-10.888-11.051l-22.312-9.434c2.508-2.775 4.563-5.976 6.062-9.521 3.522-8.329 3.581-17.54.172-25.922-3.902-9.643.765-20.678 10.403-24.598 3.836-1.56 5.682-5.935 4.121-9.771-1.56-3.837-5.936-5.684-9.772-4.122-17.285 7.029-25.654 26.819-18.651 44.128 1.903 4.679 1.872 9.808-.088 14.444-1.581 3.74-4.283 6.784-7.722 8.819l-34.713-14.678c-10.314-4.322-22.222.523-26.546 10.794l-13.067 30.915c-27.099-1.823-54.627 2.502-79.968 12.596-12.999 4.318-25.667 12.271-34.086 17.894-67.301 45.007-96.829 129.366-72.711 206.359-10.115 13.387-16.126 30.04-16.126 48.076 0 44.054 35.827 79.894 79.864 79.894 15.865 0 30.652-4.668 43.096-12.674 21.82 8.711 44.68 13.077 67.56 13.077 23.262 0 46.541-4.507 68.758-13.529 45.237-18.354 80.616-53.227 99.621-98.195 19.003-44.964 19.36-94.635 1.002-139.866zm-344.902 171.293c0-35.784 29.099-64.896 64.866-64.896 10.197 0 19.96 2.297 29.019 6.827 3.704 1.851 8.21.352 10.061-3.353 1.852-3.704.352-8.209-3.353-10.061-11.16-5.581-23.181-8.411-35.727-8.411-5.637 0-11.137.596-16.447 1.712-4.4-22.773-2.629-45.926 5.187-67.766l22.842 9.651c.953.403 1.942.594 2.915.594 2.923 0 5.702-1.721 6.911-4.582 1.612-3.815-.174-8.215-3.989-9.826l-22.855-9.657c12.921-26.322 34.076-47.177 60.586-59.727l9.33 23.001c1.182 2.915 3.989 4.682 6.952 4.682.938 0 1.893-.178 2.816-.552 3.838-1.556 5.687-5.93 4.131-9.768l-9.33-23.003c27.749-9.468 57.444-9.256 85.051.611l-9.676 22.853c-1.615 3.814.167 8.215 3.981 9.83.954.404 1.946.596 2.921.596 2.921 0 5.699-1.718 6.909-4.577l9.681-22.863c27.011 13.281 47.511 34.999 59.652 60.589l-22.955 9.332c-3.836 1.56-5.682 5.935-4.123 9.771 1.184 2.913 3.989 4.677 6.949 4.677.94 0 1.897-.178 2.822-.554l22.947-9.329c9.128 26.813 9.566 56.685-.538 85.055l-22.877-9.678c-3.815-1.611-8.215.17-9.828 3.985-1.614 3.814.17 8.214 3.984 9.828l22.88 9.68c-13.223 26.812-34.969 47.357-60.641 59.554l-9.268-22.85c-1.557-3.837-5.931-5.686-9.768-4.13-3.838 1.556-5.687 5.93-4.131 9.768l9.274 22.863c-23.831 8.143-50.1 9.449-75.609 2.485 2.074-7.101 3.208-14.599 3.208-22.36 0-17.504-5.557-34.119-16.071-48.05-2.494-3.305-7.196-3.963-10.503-1.469-3.306 2.495-3.963 7.197-1.468 10.503 8.534 11.307 13.044 24.799 13.044 39.016 0 35.784-29.111 64.896-64.894 64.896-35.769-.001-64.868-29.113-64.868-64.897zm330.084-37.265c-17.445 41.276-49.921 73.287-91.447 90.136-37.791 15.346-78.928 16.457-117.108 3.389 5.777-5.818 10.651-12.525 14.431-19.884 12.98 3.716 26.299 5.571 39.6 5.571 20.133 0 40.224-4.238 59.034-12.652 33.463-14.97 59.758-41.82 74.044-75.606 30.989-73.403-3.48-158.328-76.835-189.311-35.542-15.026-74.811-15.309-110.574-.792-35.762 14.516-63.724 42.085-78.734 77.625-11.485 27.14-14.382 56.424-8.494 85.106-7.645 3.217-14.676 7.602-20.897 12.913-17.65-68.382 9.684-141.483 69.068-181.195 4.456-2.976 18.017-12.034 30.664-16.192.149-.049.296-.103.442-.161 24.904-9.957 52.111-13.84 78.675-11.225 3.263.33 6.363-1.518 7.641-4.543l15.185-35.925c1.105-2.624 4.278-3.902 6.907-2.799l72.474 30.644c1.297.55 2.305 1.574 2.839 2.886.531 1.307.523 2.735-.024 4.028l-15.181 35.914c-1.28 3.028-.438 6.536 2.075 8.654 20.599 17.355 36.899 39.845 47.137 65.034 16.85 41.517 16.523 87.111-.922 128.385z"></path></g></svg>`,
  `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 66"><g><g><g><g><path d="m27.8 48.7c-.2 0-.4-.1-.6-.2l-3-2.3c-.2-.2-.3-.4-.4-.7 0-.3 0-.5.2-.7l11-14.2c.3-.4 1-.5 1.4-.2l3 2.3c.2.2.3.4.4.7 0 .3 0 .5-.2.7l-11 14.2c-.2.3-.5.4-.8.4zm-1.7-3.5 1.5 1.1 9.7-12.6-1.5-1.1z"></path></g><g><path d="m45.1 60c-.6 0-1.2-.2-1.8-.6l-9.4-7.2c-.5-.4-1.2-1-1.8-1.6-.1-.1-.3-.3-.5-.5-1.8-1.8-3-2.9-3.3-3.6-.2-.3-.1-.8.1-1.1l8.4-10.9c.3-.4 1-.5 1.4-.2l1.4 1.1c.2.1.4.2.6.2.7-.1 1.5.1 2.1.6l.3.2c.4.3.5 1 .2 1.4s-1 .5-1.4.2l-.4-.3c-.2-.1-.4-.2-.6-.2-.7.1-1.5-.1-2.1-.6l-.6-.5-7.4 9.6c.7.8 2 2.1 2.6 2.6.2.2.4.4.6.5.6.6 1.2 1.1 1.6 1.4l9.4 7.2c.4.3 1 .2 1.3-.2s.2-1-.2-1.3l-1.4-1.1c-.4-.3-.5-1-.2-1.4s1-.5 1.4-.2l1.4 1.1c1.3 1 1.5 2.8.5 4.1-.5.9-1.4 1.3-2.2 1.3z"></path></g><g><path d="m56.1 53.8c-.6 0-1.3-.2-1.8-.6l-6.2-4.8c-.4-.3-.5-1-.2-1.4s1-.5 1.4-.2l6.2 4.8c.2.2.4.2.7.2.2 0 .5-.2.6-.4.3-.4.2-1-.2-1.3l-11.3-8.7c-.4-.3-.5-1-.2-1.4s1-.5 1.4-.2l11.3 8.7c1.3 1 1.5 2.8.5 4.1-.5.6-1.2 1-1.9 1.1-.1.1-.2.1-.3.1z"></path></g><g><path d="m48.4 57.6c-.6 0-1.3-.2-1.8-.6l-2.7-2c-.4-.3-.5-1-.2-1.4s1-.5 1.4-.2l2.7 2.1c.4.3 1 .2 1.3-.2s.2-1-.2-1.3l-2.7-2.1c-.4-.3-.5-1-.2-1.4s1-.5 1.4-.2l2.7 2.1c1.3 1 1.5 2.8.5 4.1-.5.7-1.3 1.1-2.2 1.1z"></path></g><g><path d="m51.9 55.5c-.6 0-1.3-.2-1.8-.6l-2.8-2.2c-.4-.3-.5-1-.2-1.4s1-.5 1.4-.2l2.8 2.2c.4.3 1 .2 1.3-.2s.2-1-.2-1.3l-3.3-2.5c-.4-.3-.5-1-.2-1.4s1-.5 1.4-.2l3.3 2.5c1.3 1 1.5 2.8.5 4.1-.4.8-1.3 1.2-2.2 1.2z"></path></g></g><g><path d="m43.5 47.5c-.1 0-.3 0-.4-.1-.2-.1-.4-.3-.5-.6l-1.9-4.9c-.8-2.1-.1-4.5 1.6-5.9l2.5-1.9c1-.8 2.3-1.2 3.5-1.2h.9c.8 0 1.5-.2 2.1-.7l.9-.6c.5-.3 1.1-.2 1.4.3s.2 1.1-.3 1.4l-.9.6c-1 .7-2.1 1-3.3 1h-.9c-.8 0-1.7.3-2.3.8l-2.5 1.9c-1.1.8-1.5 2.3-1 3.6l1.6 3.8c.9-.8 1.3-2 1-3.2l-.2-.7c-.1-.5.2-1.1.7-1.2s1.1.2 1.2.7l.2.7c.7 2.5-.6 5.1-3.1 6.1-.1.1-.2.1-.3.1z"></path></g><g><path d="m60.2 48.9c-.4 0-.7-.2-.9-.6l-8.1-17.2c-.1-.2-.1-.5 0-.8s.3-.5.5-.6l3.8-1.7c.5-.2 1.1 0 1.3.5l8.1 17.2c.1.2.1.5 0 .8s-.3.5-.5.6l-3.8 1.7c-.1.1-.2.1-.4.1zm-6.7-17.7 7.2 15.4 1.9-.9-7.2-15.4z"></path></g><g><path d="m56.6 49.3c-.4 0-.7-.2-.9-.6-.2-.5 0-1.1.5-1.3l3.1-1.4c.5-.2 1.1 0 1.3.5s0 1.1-.5 1.3l-3.1 1.4c-.1.1-.2.1-.4.1z"></path></g></g><g><g><path d="m44.8 65h-32.7c-2.9 0-5.3-2.4-5.3-5.3v-47.6c0-2.9 2.4-5.3 5.3-5.3h32.7c2.9 0 5.3 2.4 5.3 5.3v20.9c0 .6-.4 1-1 1s-1-.4-1-1v-20.9c0-1.8-1.5-3.3-3.3-3.3h-32.7c-1.8 0-3.3 1.5-3.3 3.3v47.6c0 1.8 1.5 3.3 3.3 3.3h32.7c1.8 0 3.3-1.5 3.3-3.3v-3c0-.6.4-1 1-1s1 .4 1 1v3c0 2.9-2.4 5.3-5.3 5.3z"></path></g><g><g><path d="m7.8 59.2h-1.5c-2.9 0-5.3-2.4-5.3-5.3v-47.6c0-2.9 2.4-5.3 5.3-5.3h32.7c2.9 0 5.3 2.4 5.3 5.3v1.5c0 .6-.4 1-1 1h-31.2c-1.8 0-3.3 1.5-3.3 3.3v46.1c0 .5-.4 1-1 1zm-1.5-56.2c-1.8 0-3.3 1.5-3.3 3.3v47.6c0 1.8 1.5 3.3 3.3 3.3h.5v-45.1c0-2.9 2.4-5.3 5.3-5.3h30.2v-.5c0-1.8-1.5-3.3-3.3-3.3z"></path></g></g></g><g><g><g><g><path d="m37 16.2c-1.3 0-2.5-.7-3.2-1.8h-10.5c-.7 1.1-1.9 1.8-3.2 1.8-1.6 0-3-1-3.5-2.5-.2-.5.1-1.1.6-1.3s1.1.1 1.3.6c.3.7.9 1.1 1.6 1.1s1.4-.5 1.7-1.2c.1-.4.5-.7.9-.7h11.7c.4 0 .8.3.9.7.3.7.9 1.2 1.7 1.2.7 0 1.4-.5 1.6-1.2.2-.5.8-.8 1.3-.6s.8.8.6 1.3c-.5 1.6-1.9 2.6-3.5 2.6z"></path></g><g><path d="m33.6 21.3c-.2 0-.4-.1-.5-.2-.5-.3-.6-.9-.3-1.4l3.3-5.1c.2-.3.5-.5.9-.5s.7.2.8.5l2.8 5.1c.3.5.1 1.1-.4 1.4s-1.1.1-1.4-.4l-1.9-3.6-2.4 3.7c-.2.4-.6.5-.9.5z"></path></g><g><path d="m36.6 25.7c-2.8 0-5.1-2.3-5.1-5.1 0-.6.4-1 1-1h8.1c.6 0 1 .4 1 1 .1 2.8-2.2 5.1-5 5.1zm-2.9-4.1c.4 1.2 1.6 2.1 2.9 2.1s2.5-.9 2.9-2.1z"></path></g><g><path d="m16.8 21.3c-.2 0-.4-.1-.5-.2-.5-.3-.6-.9-.3-1.4l3.3-5.1c.2-.3.5-.5.9-.5s.7.2.8.5l2.8 5.1c.3.5.1 1.1-.4 1.4s-1.1.1-1.4-.4l-2-3.5-2.4 3.7c-.1.3-.4.4-.8.4z"></path></g><g><path d="m19.8 25.7c-2.8 0-5.1-2.3-5.1-5.1 0-.6.4-1 1-1h8.1c.6 0 1 .4 1 1 .1 2.8-2.2 5.1-5 5.1zm-2.9-4.1c.4 1.2 1.6 2.1 2.9 2.1s2.5-.9 2.9-2.1z"></path></g></g><g><path d="m28.3 29.9c-.6 0-1-.4-1-1v-16.6c0-.6.4-1 1-1s1 .4 1 1v16.6c0 .5-.4 1-1 1z"></path></g></g><g><path d="m30.8 29.9h-4.9c-.6 0-1-.4-1-1s.4-1 1-1h4.9c.6 0 1 .4 1 1s-.5 1-1 1z"></path></g></g><g><g><path d="m25.9 36.2h-10.1c-.6 0-1-.4-1-1s.4-1 1-1h10.1c.6 0 1 .4 1 1s-.5 1-1 1z"></path></g><g><path d="m23.4 42h-7.6c-.6 0-1-.4-1-1s.4-1 1-1h7.6c.6 0 1 .4 1 1s-.5 1-1 1z"></path></g><g><path d="m21.6 47.7h-5.8c-.6 0-1-.4-1-1s.4-1 1-1h5.8c.6 0 1 .4 1 1s-.5 1-1 1z"></path></g><g><path d="m26.4 53.4h-10.6c-.6 0-1-.4-1-1s.4-1 1-1h10.6c.6 0 1 .4 1 1s-.5 1-1 1z"></path></g><g><path d="m34.1 59.2h-18.3c-.6 0-1-.4-1-1s.4-1 1-1h18.3c.6 0 1 .4 1 1s-.5 1-1 1z"></path></g></g></g></svg>`,
  `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><g><path d="m427.037 438.394c3.861-5.257 6.152-11.735 6.152-18.743 0-14.919-10.348-27.459-24.241-30.839v-24.739c0-4.143-3.357-7.5-7.5-7.5h-137.948v-22.398h53.103c4.143 0 7.5-3.357 7.5-7.5v-48.483c0-21.351-16.891-38.826-38.011-39.776 4.833-6.351 7.71-14.267 7.71-22.845 0-18.276-13.038-33.562-30.301-37.051v-22.107h53.099c4.143 0 7.5-3.357 7.5-7.5v-8.949c0-4.143-3.357-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v1.449h-106.199v-40.989c0-13.685 11.134-24.82 24.819-24.82h56.56c13.685 0 24.819 11.135 24.819 24.82v4.54c0 4.143 3.357 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-4.54c0-21.355-16.898-38.831-38.023-39.774 4.837-6.352 7.725-14.265 7.725-22.847 0-20.845-16.957-37.803-37.801-37.803s-37.801 16.958-37.801 37.802c0 8.582 2.888 16.495 7.725 22.847-21.125.943-38.023 18.42-38.023 39.774v48.489c0 4.143 3.357 7.5 7.5 7.5h53.099v22.107c-17.263 3.489-30.301 18.775-30.301 37.051 0 1.645.116 3.262.321 4.852-5.082-1.46-10.443-2.251-15.988-2.251-3.946 0-7.899.401-11.751 1.193-4.058.835-6.67 4.801-5.836 8.857.836 4.058 4.803 6.669 8.857 5.836 2.859-.589 5.797-.887 8.729-.887 23.71 0 43 19.29 43 43 0 23.716-19.29 43.009-43 43.009s-43-19.294-43-43.009c0-9.827 3.223-19.07 9.318-26.73 2.579-3.24 2.043-7.959-1.198-10.538-3.24-2.579-7.96-2.043-10.538 1.198-8.231 10.342-12.582 22.815-12.582 36.07 0 31.986 26.018 58.009 57.999 58.009.077 0 45.969-.006 45.969-.006v22.398h-137.947c-4.143 0-7.5 3.357-7.5 7.5v24.739c-13.893 3.38-24.241 15.92-24.241 30.839 0 7.007 2.288 13.487 6.149 18.744-12.996 4.701-22.31 17.161-22.31 31.758v34.341c0 4.143 3.357 7.5 7.5 7.5h80.804c4.143 0 7.5-3.357 7.5-7.5v-34.341c0-14.598-9.314-27.058-22.31-31.758 3.861-5.257 6.149-11.737 6.149-18.744 0-14.919-10.348-27.459-24.241-30.839v-17.239h130.448v17.239c-13.893 3.38-24.241 15.92-24.241 30.839 0 7.007 2.292 13.484 6.153 18.741-12.997 4.7-22.312 17.16-22.312 31.758v34.35c0 4.143 3.357 7.5 7.5 7.5h22.9c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5h-15.4v-26.85c0-10.344 8.416-18.76 18.761-18.76h28.279c10.345 0 18.761 8.416 18.761 18.76v26.852h-15.4c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h22.9c4.143 0 7.5-3.357 7.5-7.5v-34.35c0-14.596-9.312-27.055-22.307-31.756 3.86-5.256 6.148-11.736 6.148-18.742 0-14.919-10.348-27.459-24.241-30.839v-17.239h130.448v17.239c-13.893 3.38-24.241 15.92-24.241 30.839 0 7.007 2.288 13.487 6.149 18.744-12.996 4.701-22.31 17.161-22.31 31.758v34.341c0 4.143 3.357 7.5 7.5 7.5h80.804c4.143 0 7.5-3.357 7.5-7.5v-34.341c-.001-14.599-9.316-27.06-22.314-31.76zm-171.037-423.394c12.573 0 22.802 10.229 22.802 22.803s-10.229 22.801-22.802 22.801-22.802-10.228-22.802-22.802 10.229-22.802 22.802-22.802zm0 177.77c12.573 0 22.802 10.228 22.802 22.802 0 12.535-10.166 22.737-22.686 22.8h-.231c-12.52-.063-22.686-10.265-22.686-22.8-.001-12.574 10.228-22.802 22.801-22.802zm4.53 83.402c0-8.091-1.671-15.798-4.677-22.802h.037c.037 0 .073.003.109.003.039 0 .077-.003.115-.003h28.166c13.686 0 24.821 11.135 24.821 24.822v40.983h-67.69c11.735-10.622 19.119-25.965 19.119-43.003zm-117.076 193.982v26.842h-65.804v-26.842c0-10.346 8.416-18.762 18.762-18.762h28.281c10.345 0 18.761 8.416 18.761 18.762zm-16.161-50.503c0 9.231-7.51 16.741-16.741 16.741s-16.741-7.51-16.741-16.741 7.51-16.742 16.741-16.742 16.741 7.511 16.741 16.742zm145.448 0c0 9.231-7.51 16.741-16.741 16.741s-16.741-7.51-16.741-16.741 7.51-16.742 16.741-16.742 16.741 7.511 16.741 16.742zm128.707-16.742c9.231 0 16.741 7.511 16.741 16.742s-7.51 16.741-16.741 16.741-16.741-7.51-16.741-16.741 7.509-16.742 16.741-16.742zm32.902 94.086h-65.804v-26.842c0-10.346 8.416-18.762 18.762-18.762h28.281c10.346 0 18.762 8.416 18.762 18.762v26.842z"></path><path d="m181.066 297.64c2.93 2.928 7.678 2.928 10.607 0l10.857-10.858 10.857 10.858c1.465 1.464 3.385 2.196 5.304 2.196s3.839-.732 5.304-2.196c2.929-2.93 2.929-7.678 0-10.607l-10.857-10.857 10.857-10.857c2.929-2.93 2.929-7.678 0-10.607-2.93-2.928-7.678-2.928-10.607 0l-10.857 10.858-10.857-10.858c-2.93-2.928-7.678-2.928-10.607 0-2.929 2.93-2.929 7.678 0 10.607l10.857 10.857-10.857 10.857c-2.93 2.929-2.93 7.677-.001 10.607z"></path></g></g></svg>`,
];

/* ─── Team panel data ────────────────────────────────────────────── */
const TROY: PanelItem & { title: string; photo: string; bio: string } = {
  label: "ATTORNEY AT LAW",
  title: "Troy M. Moore",
  href: "#troy",
  photo: "/assets/troy-profile.webp",
  bio: "25+ years of Texas probate & estate planning.",
  panel: {
    headline: "Troy M. Moore",
    sections: [
      {
        heading: "About Troy",
        body: "Troy is licensed to practice in all courts in the State of Texas, as well as the Texas Southern District Court of the United States.\n\nMr. Moore was raised locally in Cypress, Texas. He is a proud father of two young college students. Since beginning his career, he has focused on probate, estate planning, life insurance litigation, and trust property matters. Clients enjoy dynamic and effective legal services with a client first attitude — always.\n\n\"Remember, an ounce of legal prevention is worth far more than a pound of cure.\"",
      },
      {
        heading: "Academic Achievements",
        body: "Mr. Moore was an accomplished student while at South Texas College of Law. He received the highest grade award in Texas Pretrial Procedure, made the Dean's List in 2001, and served as Editor in Chief and Associate Editor of the Corporate Counsel Review, a publication from South Texas College of Law.",
      },
      {
        heading: "Professional Credentials",
        body: "Mr. Moore's professional experience speaks for itself:",
        list: [
          "25 Years Licensed in Texas",
          "Former Primary Candidate for Judge of Harris County Probate Court No. 5",
          "Solo practitioner for 18 years",
          "Member of American Inns of Court – Texas Probate Section",
          "Member of REPTL (Real Estate, Probate & Trust Lawyer) Section of the State Bar of Texas",
          "Member of Texas Trial Lawyers Association",
          "Member of Houston Trial Lawyers Association",
          "Admitted to practice before US Federal Court, Southern District",
          "Admitted to the State Bar of New Mexico",
          "Author of Legal Articles on Probate Matters and Personal Injury",
        ],
      },
      {
        heading: "Practice Areas",
        body: "",
        list: [
          "Probate Law",
          "Estate Planning",
          "Life Insurance Litigation",
          "Trusts & Estates",
          "Personal Injury",
        ],
      },
      {
        heading: "Education",
        body: "Bachelor of Arts in Biology, Texas A&M, 1998.\n\nDoctor of Jurisprudence, South Texas College of Law, 2001.\n\nGood standing with the State Bar of Texas, active since 2001.",
      },
      {
        heading: "Contact",
        body: "Email: t.moore@troymoorelaw.com\nPhone: (281) 942-6907",
      },
    ],
  },
};

const TIFFANY: PanelItem & { title: string; photo: string; bio: string } = {
  label: "PARALEGAL",
  title: "Tiffany Bell",
  href: "#tiffany",
  photo: "/assets/tiffany-profile.webp",
  bio: "Nearly 8 years of experience in probate, estate planning & personal injury.",
  panel: {
    headline: "Tiffany Bell",
    sections: [
      {
        heading: "About Tiffany",
        body: "Tiffany Bell is an experienced paralegal with nearly 8 years of dedicated service in the legal field. Motivated by a genuine desire to understand legal processes and assist others, she has established herself as an indispensable asset in the areas of probate, estate planning, and personal injury.\n\nTiffany holds an Associates of Applied Science and an Advanced Technical Certificate, both in Paralegal Studies, which have honed her expertise and understanding of the intricacies of the legal system.",
      },
      {
        heading: "Dedication to Every Case",
        body: "Tiffany's commitment to her work shines through as she takes on files from start to finish, ensuring no detail goes unnoticed. Her dedication to the success of each case and her ability to work closely with the attorney make her an invaluable asset to the legal team.",
      },
    ],
  },
};

const TEAM = [TROY, TIFFANY];

/* ─── Shared circle SVG ──────────────────────────────────────────── */
function CircleSVG() {
  return (
    <span className="cta-circle">
      <svg viewBox="0 0 29 29" fill="none" style={{ width: "1.625em", height: "1.625em" }}>
        <path className="CircleIcon_circle__vewPw" d="M0.75 14.5a13.75 13.75 0 1 0 27.5 0a13.75 13.75 0 1 0 -27.5 0" />
        <path className="CircleIcon_circle-overlay__lg7sz" d="M0.75,14.5A13.75,13.75 0 1 1 28.25,14.5A13.75,13.75 0 1 1 0.75,14.5" />
        <path className="CircleIcon_icon__n80xg" d="M12.5 11L16 14.5L12.5 18" stroke="currentColor" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function AboutPage() {
  const [panelItem, setPanelItem] = useState<PanelItem | null>(null);
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (mounted && panelRef.current) gsap.set(panelRef.current, { x: "100%" });
  }, [mounted]);

  const openPanel = useCallback((item: PanelItem) => {
    setPanelItem(item);
    document.body.style.overflow = "hidden";
    gsap.timeline()
      .to(contentRef.current, { x: 18, duration: 0.13, ease: "power2.out" })
      .to(contentRef.current, { x: "-85vw", duration: 0.85, ease: "expo.inOut" });
    gsap.to(panelRef.current, { x: 0, duration: 0.85, ease: "expo.inOut", delay: 0.06 });
  }, []);

  const closePanel = useCallback(() => {
    gsap.to(panelRef.current, { x: "100%", duration: 0.55, ease: "power4.in" });
    gsap.to(contentRef.current, {
      x: 0, duration: 0.72, ease: "expo.out", delay: 0.08,
      onComplete: () => { setPanelItem(null); document.body.style.overflow = ""; },
    });
  }, []);

  return (
    <>
      <style>{`
        /* ── Hero overlay ── */
        .about-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(6,30,54,0.72) 0%,
            rgba(11,55,93,0.55) 50%,
            rgba(6,30,54,0.82) 100%
          );
        }

        /* ── Stat bar grid ── */
        .about-stat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        @media (max-width: 767px) {
          .about-stat-grid { grid-template-columns: 1fr 1fr; }
        }

        /* ── Intro grid ── */
        .about-intro-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(3rem, 5vw, 6rem);
          align-items: start;
        }
        @media (max-width: 900px) {
          .about-intro-grid { grid-template-columns: 1fr; }
        }

        /* ── Team grid ── */
        .about-team-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(1.5rem, 3vw, 3rem);
          max-width: 860px;
        }
        @media (max-width: 640px) {
          .about-team-grid { grid-template-columns: 1fr; }
        }

        /* ── Team card ── */
        .about-team-card {
          display: flex;
          flex-direction: column;
          width: 100%;
          cursor: pointer;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
          background: #fff;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
          text-align: left;
        }
        .about-team-card:hover {
          border-color: var(--gold);
          box-shadow: 0 20px 50px rgba(11,55,93,0.12);
          transform: translateY(-4px);
        }
        .about-team-card .card-photo {
          width: 100%;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          object-position: top center;
          display: block;
          transition: transform 0.5s ease;
        }
        .about-team-card:hover .card-photo { transform: scale(1.03); }
        .about-team-card .card-body {
          padding: clamp(1.25rem, 2vw, 1.75rem);
          border-top: 1px solid #f0f0f0;
        }

        /* ── Circle CTA on info-row cards (reuse probate style) ── */
        .about-team-card .cta-circle {
          width: 3em; height: 3em; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; position: relative; overflow: hidden;
          color: rgba(11,55,93,0.3);
          transition: color 0.4s ease;
        }
        .about-team-card:hover .cta-circle { color: var(--gold); }
        .about-team-card .cta-circle svg .CircleIcon_circle__vewPw {
          stroke: rgba(11,55,93,0.18); stroke-width: 1.5; fill: none;
          stroke-dasharray: 100; stroke-dashoffset: 0;
          transition: stroke-dashoffset 0.8s ease, stroke 0.4s ease;
        }
        .about-team-card .cta-circle svg .CircleIcon_circle-overlay__lg7sz {
          stroke: var(--gold); stroke-width: 1.5; fill: none;
          stroke-dasharray: 100; stroke-dashoffset: 100;
          transition: stroke-dashoffset 0.8s ease;
        }
        .about-team-card:hover .cta-circle svg .CircleIcon_circle-overlay__lg7sz { stroke-dashoffset: 0; }
        .about-team-card .cta-circle svg .CircleIcon_icon__n80xg {
          stroke: currentColor; fill: none; transition: stroke 0.4s ease;
        }

        /* ── Side panel width ── */
        .side-panel { width: 85vw; }
        @media (max-width: 640px) { .side-panel { width: 100vw; } }

      `}</style>

      <div
        ref={contentRef}
        style={{ cursor: panelItem ? "pointer" : "auto" }}
        onClick={panelItem ? closePanel : undefined}
      >
        <Navbar />

        <main>
          {/* ── 1. HERO ──────────────────────────────────────────── */}
          <section
            style={{
              position: "relative",
              minHeight: "80vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              backgroundImage: "url(/assets/about.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center top",
            }}
          >
            <div className="about-hero-overlay" />

            {/* Content */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                ...WRAP,
                paddingTop: "calc(72px + clamp(4rem, 8vw, 9rem))",
                paddingBottom: "clamp(4rem, 7vw, 8rem)",
              }}
            >
              <p
                className="eyebrow"
                style={{
                  color: "var(--gold)",
                  marginBottom: "clamp(0.4rem, 0.6vw, 0.6rem)",
                  fontSize: "clamp(0.6rem, 0.7vw, 0.8rem)",
                }}
              >
                Houston Probate &amp; Estate Planning
              </p>
              <h1
                style={{
                  color: "#ffffff",
                  marginBottom: "clamp(1rem, 1.5vw, 1.5rem)",
                  maxWidth: "18ch",
                }}
              >
                About Us
              </h1>
              <p
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "clamp(1rem, 1.4vw, 1.55rem)",
                  fontStyle: "italic",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 300,
                  lineHeight: 1.5,
                  maxWidth: "44ch",
                  marginBottom: "clamp(2rem, 3vw, 3rem)",
                }}
              >
                Compassion for clients&rsquo; needs and attention to detail.
              </p>

              {/* Stat badges */}
              <div style={{ display: "flex", gap: "clamp(0.75rem, 1.5vw, 1.5rem)", flexWrap: "wrap", marginBottom: "clamp(2rem, 3vw, 3.5rem)" }}>
                {[
                  { value: "3,000+", label: "Clients Served" },
                  { value: "100+", label: "5-Star Reviews" },
                ].map((badge, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.6rem 1.25rem",
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: 4,
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(1.4rem, 2.2vw, 2.5rem)", color: "var(--gold)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                      {badge.value}
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(0.72rem, 0.82vw, 0.9rem)", fontFamily: "var(--font-eyebrow)", textTransform: "uppercase", letterSpacing: "0.14em", lineHeight: 1.3 }}>
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>

              <a href="#" onClick={openTalkToTroy} className="btn-cta-ghost" style={{ textDecoration: "none" }}>
                Schedule a Consultation
                <CircleSVG />
              </a>
            </div>
          </section>

          {/* ── 2. STAT BAR ──────────────────────────────────────── */}
          <section style={{
            background: [
              "radial-gradient(ellipse at 18% 30%, rgba(14, 62, 115, 0.75) 0%, transparent 46%)",
              "radial-gradient(ellipse at 82% 70%, rgba(3, 10, 28, 0.85) 0%, transparent 44%)",
              "radial-gradient(ellipse at 60% 8%, rgba(10, 44, 90, 0.55) 0%, transparent 38%)",
              "radial-gradient(ellipse at 50% 50%, rgba(11, 55, 93, 0.3) 0%, transparent 60%)",
              "linear-gradient(135deg, #030c1d 0%, #061828 22%, #0b375d 50%, #071d3c 75%, #030c1d 100%)",
            ].join(", "),
            borderTop: "1px solid rgba(195,160,91,0.2)",
          }}>
            <div style={{ ...WRAP, paddingTop: "clamp(2.5rem, 4vw, 4rem)", paddingBottom: "clamp(2.5rem, 4vw, 4rem)" }}>
              <div className="about-stat-grid">
                {[
                  { stat: "25+", label: "Years Licensed in Texas" },
                  { stat: "3,000+", label: "Clients Served" },
                  { stat: "100+", label: "5-Star Reviews" },
                  { stat: "All Texas", label: "Statewide Service" },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      textAlign: "center",
                      padding: "clamp(1.5rem, 2.5vw, 2.5rem) clamp(1rem, 1.5vw, 1.5rem)",
                      borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
                    }}
                  >
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 300, fontStyle: "italic", color: "var(--gold)", fontSize: "clamp(2.5rem, 5vw, 6rem)", lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
                      {item.stat}
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-eyebrow)", fontSize: "clamp(0.62rem, 0.78vw, 0.88rem)", letterSpacing: "0.18em", textTransform: "uppercase", lineHeight: 1.5 }}>
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 3. INTRO ─────────────────────────────────────────── */}
          <section style={{ background: "#fff", ...PAD }}>
            <div style={WRAP}>
              <div className="about-intro-grid">
                {/* Left: copy */}
                <div>
                  <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "clamp(0.3rem, 0.5vw, 0.5rem)" }}>
                    Our Firm
                  </p>
                  <h2 style={{ color: "var(--navy)", marginBottom: "clamp(1.5rem, 2vw, 2rem)" }}>
                    Welcome to Law Office of Troy M. Moore, PLLC
                  </h2>
                  <p style={{ color: "#6a7a8a", lineHeight: 1.85, marginBottom: "1.25rem" }}>
                    Your leading Houston, Texas-based law firm specializing in probate and estate planning. With more than 25 years of experience, we have cemented our reputation as industry leaders, offering unrivaled legal services to clients throughout Houston, The Woodlands, Spring, Cypress, Tomball, Magnolia, and all of Texas.
                  </p>
                  <p style={{ color: "#6a7a8a", lineHeight: 1.85, marginBottom: "1.25rem" }}>
                    Our primary practice areas are probate and estate planning — fields where we have garnered immense experience and achieved remarkable results. We help families navigate through the probate process after the loss of a loved one and work to minimize disputes. For estate planning, we take a comprehensive approach, ensuring your assets and legacy are secure, thereby providing peace of mind to you and your loved ones.
                  </p>
                  <p style={{ color: "#6a7a8a", lineHeight: 1.85, marginBottom: "clamp(2rem, 3vw, 3rem)" }}>
                    Located in the heart of Houston, Texas, we are ready to assist you with all your probate and estate planning needs. To learn more about how we can help you create a strategic and comprehensive plan for the present or the future, please contact our law firm today.
                  </p>
                  <a href="tel:2816090303" className="btn-cta" style={{ textDecoration: "none" }}>
                    Call (281) 609-0303
                    <CircleSVG />
                  </a>
                </div>

                {/* Right: credential badges */}
                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1.5rem, 2.5vw, 2.5rem)" }}>
                  {/* Badges */}
                  <div>
                    <p className="eyebrow" style={{ color: "var(--gold)", fontSize: "clamp(0.52rem, 0.6vw, 0.7rem)", marginBottom: "1.25rem" }}>
                      Professional Memberships
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
                      {[
                        { src: "/assets/badge-htla.png", alt: "Houston Trial Lawyers Association" },
                        { src: "/assets/badge-reptl.png", alt: "REPTL" },
                        { src: "/assets/badge-expertise.png", alt: "Expertise" },
                        { src: "/assets/badge-ttla.png", alt: "Texas Trial Lawyers Association" },
                      ].map((badge) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={badge.alt}
                          src={badge.src}
                          alt={badge.alt}
                          style={{ height: "clamp(48px, 5vw, 64px)", width: "auto", objectFit: "contain" }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Highlight cards */}
                  {[
                    {
                      title: "Probate Specialists",
                      body: "Houston's go-to firm for guiding families through the Texas probate process — efficiently and with care.",
                    },
                    {
                      title: "Comprehensive Estate Planning",
                      body: "From simple wills to full revocable living trusts, we build plans tailored to your family's specific needs.",
                    },
                    {
                      title: "Client-First Attitude — Always",
                      body: "Every client receives direct attorney attention and a responsive, personal approach throughout their matter.",
                    },
                  ].map((card, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "flex-start",
                        padding: "clamp(1rem, 1.5vw, 1.5rem)",
                        background: "var(--light-gray)",
                        borderRadius: 6,
                        borderLeft: "3px solid var(--gold)",
                      }}
                    >
                      <div style={{ width: 28, height: 28, flexShrink: 0, color: "var(--gold)", marginTop: "0.05rem" }} dangerouslySetInnerHTML={{ __html: ABOUT_ICONS[i] }} />
                      <div>
                        <p style={{ color: "var(--navy)", fontWeight: 500, fontSize: "clamp(0.85rem, 0.9vw, 1rem)", marginBottom: "0.35rem" }}>{card.title}</p>
                        <p style={{ color: "#6a7a8a", fontSize: "clamp(0.78rem, 0.82vw, 0.92rem)", lineHeight: 1.65 }}>{card.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── 4. OUR TEAM ──────────────────────────────────────── */}
          <section style={{ background: "var(--light-gray)", ...PAD }}>
            <div style={WRAP}>
              <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "clamp(0.3rem, 0.5vw, 0.5rem)" }}>
                Our People
              </p>
              <h2 style={{ color: "var(--navy)", marginBottom: "clamp(2.5rem, 4vw, 4rem)" }}>
                Meet the Team
              </h2>

              <div className="about-team-grid">
                {TEAM.map((member) => (
                  <button
                    key={member.href}
                    className="about-team-card"
                    onClick={() => openPanel(member)}
                    style={{ padding: 0, font: "inherit" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.photo}
                      alt={member.title}
                      className="card-photo"
                    />
                    <div className="card-body" style={{ background: "#fff" }}>
                      <p className="eyebrow" style={{ color: "var(--gold)", fontSize: "clamp(0.5rem, 0.58vw, 0.66rem)", marginBottom: "0.4rem" }}>
                        {member.label}
                      </p>
                      <h3 style={{ color: "var(--navy)", fontSize: "clamp(1rem, 1.2vw, 1.4rem)", fontWeight: 500, marginBottom: "0.4rem" }}>
                        {member.title}
                      </h3>
                      <p style={{ color: "#8899a8", fontSize: "clamp(0.78rem, 0.82vw, 0.92rem)", lineHeight: 1.6, marginBottom: "1rem" }}>
                        {member.bio}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ color: "var(--navy)", fontSize: "clamp(0.78rem, 0.82vw, 0.9rem)", fontWeight: 500 }}>
                          View Profile
                        </span>
                        <CircleSVG />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ── 5. FINAL CTA ─────────────────────────────────────── */}
          <PageCTA
            eyebrow="Ready to Get Started"
            heading="Experience the difference of a firm that puts clients first."
            description="With over 25 years of Texas probate and estate planning experience, the Law Office of Troy M. Moore, PLLC is ready to guide your family through whatever comes next. Contact us today for a consultation."
          >
            <a href="tel:2816090303" className="btn-cta" style={{ textDecoration: "none" }}>
              Call (281) 609-0303
              <span className="cta-circle">
                <svg viewBox="0 0 29 29" fill="none" style={{ width: "1.625em", height: "1.625em" }}>
                  <path className="CircleIcon_circle__vewPw" d="M0.75 14.5a13.75 13.75 0 1 0 27.5 0a13.75 13.75 0 1 0 -27.5 0" />
                  <path className="CircleIcon_circle-overlay__lg7sz" d="M0.75,14.5A13.75,13.75 0 1 1 28.25,14.5A13.75,13.75 0 1 1 0.75,14.5" />
                  <path className="CircleIcon_icon__n80xg" d="M12.5 11L16 14.5L12.5 18" stroke="currentColor" strokeLinecap="round" />
                </svg>
              </span>
            </a>
          </PageCTA>
        </main>

        <Footer />
      </div>

      {/* ── Portal: close button + SidePanel ─────────────────────── */}
      {mounted && createPortal(
        <SidePanel ref={panelRef} item={panelItem} onClose={closePanel} />,
        document.body
      )}

    </>
  );
}
