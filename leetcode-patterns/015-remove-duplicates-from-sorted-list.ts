import { ListNode } from "./000-list-node";

function deleteDuplicates(head: ListNode | null): ListNode | null {
  let current = head;

  while (current?.next) {
    if (current.val === current.next.val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }

  return head;
};