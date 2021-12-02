import styles from "../styles/MessageListFooter.module.scss";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectMessages } from "../features/messages/messagesSlice";

export default function MessageListFooter() {
  const router = useRouter();
  const maxPageLinks = 5;
  const maxPerPage = 10;
  const pageLinkMaxDiff = Math.floor(maxPageLinks / 2);
  const currentPage = Number(router.query.page);
  const sortBy = router.query.sortBy;
  const [pages, setPages] = useState([]);
  const { count } = useSelector(selectMessages);

  useEffect(() => {
    const pageNumbers = [];
    const numPages = Math.ceil(count / maxPerPage);
    for (let i = 1; i <= numPages; i++) {
      pageNumbers.push(i);
    }
    setPages(pageNumbers);
  }, [count]);

  const navigateToPage = (page) => {
    router.push(`/admin/messages?sortBy=${sortBy}&page=${page}`);
  };

  return (
    <div className={styles.root}>
      <button
        disabled={currentPage === 1}
        onClick={() => navigateToPage(currentPage - 1)}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div className={styles.page_link_buttons}>
        {pages.length >= maxPageLinks && currentPage - pageLinkMaxDiff > 1 && (
          <p>...</p>
        )}
        {pages
          .filter((pageNum) =>
            currentPage <= pageLinkMaxDiff
              ? pageNum <= pageLinkMaxDiff * 2 + 1
              : currentPage > pages.length - pageLinkMaxDiff
              ? pageNum >= pages.length - pageLinkMaxDiff * 2
              : Math.abs(pageNum - currentPage) <= pageLinkMaxDiff
          )
          .map((pageNum) => (
            <button
              key={pageNum}
              className={pageNum === currentPage ? styles.active : ""}
              onClick={() => navigateToPage(pageNum)}
            >
              {pageNum}
            </button>
          ))}
        {pages.length >= maxPageLinks &&
          currentPage + pageLinkMaxDiff < pages.length && <p>...</p>}
      </div>
      <button
        disabled={!(currentPage * maxPerPage < count)}
        onClick={() => navigateToPage(currentPage + 1)}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
}
