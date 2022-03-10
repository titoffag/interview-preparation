import { ListNode } from "./000-list-node";

export function reverseList(head: ListNode | null): ListNode | null {
  let prev = null,
    current = head;

  while (current) {
    const nxt = current.next;
    current.next = prev;

    prev = current;
    current = nxt;
  }

  return prev;
}
