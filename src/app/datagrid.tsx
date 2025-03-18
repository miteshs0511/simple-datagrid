"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./datagrid.module.css";
import Image from "next/image";
import { generateUniqueId } from "./common";

interface FileData {
  id: string;
  name: string;
  device: string;
  path: string;
  status: "scheduled" | "available";
}

export default function Datagrid() {
  const [selected, setSelected] = useState<string[]>([]);
  const [data, setData] = useState<FileData[]>([]);
  const selectAllRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/sample.json");
        const json = await res.json();
        setData(
          json.map((item: Omit<FileData, "id">, index: number) => ({
            ...item,
            id: generateUniqueId(item.name, index),
          }))
        );
      } catch (err) {
        console.error("Error fetching JSON:", err);
      }
    };
    fetchData();
  }, []);

  // Effect to update the indeterminate state of "Select All" checkbox
  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate =
        selected.length > 0 && selected.length < data.length;
    }
  }, [selected, data]);

  /**
   * Toggles the selection of all rows in the table.
   *
   * - If all rows are already selected, it clears the selection.
   * - If some or none of the rows are selected, it selects all available rows.
   *
   * This ensures that clicking the "Select All" checkbox correctly toggles between
   * selecting everything and deselecting everything.
   */
  const handleSelectAll = () => {
    if (selected.length === data.length) {
      setSelected([]);
    } else {
      setSelected(data.map((item) => item.id));
    }
  };

  /**
   * Toggles the selection of a row.
   *
   * - If the row is already selected, it is removed from the `selected` list.
   * - If the row is not selected, it is added to the `selected` list.
   *
   * @param {string} id - The unique identifier of the row to be selected or deselected.
   */
  const handleSelectRow = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id); // Remove the item
      } else {
        return [...prev, id]; // Add the item
      }
    });
  };

  const availableItems = useMemo(
    () =>
      new Set(
        data
          .filter((item) => item.status === "available")
          .map((item) => item.id)
      ),
    [data]
  );

  // Returns `true` only if every selected item exists in the dataset and has the status "available".
  const allAvailable = useMemo(() => {
    return (
      selected.length > 0 && [...selected].every((id) => availableItems.has(id))
    );
  }, [selected, availableItems]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.selectionText}>
          {selected.length > 0
            ? `${selected.length} Selected`
            : "None Selected"}
        </span>
        <button
          className={`${styles.button} ${
            !allAvailable || selected.length === 0 ? styles.disabled : ""
          }`}
          disabled={!allAvailable || selected.length === 0}
          onClick={() =>
            alert(
              JSON.stringify(
                data.filter((item) => selected.includes(item.id)),
              )
            )
          }
        >
          <Image
            src="/images/down-arrow.svg"
            width={12}
            height={12}
            alt="Download"
            className={styles.downloadImage}
          ></Image>
          Download Selected
        </button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th>
              <input
                ref={selectAllRef}
                type="checkbox"
                checked={selected.length === data.length && data.length > 0}
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Device</th>
            <th>Path</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className={styles.row}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(item.id)}
                  onChange={() => handleSelectRow(item.id)}
                />
              </td>
              <td>{item.id}</td>
              <td>{item.device}</td>
              <td>{item.path}</td>
              <td>
                {item.status === "available" && (
                  <span className={styles.statusDot}></span>
                )}
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
