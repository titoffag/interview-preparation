import { ListNode } from "./000-list-node";

function removeElements(head: ListNode | null, val: number): ListNode | null {
  const result = new ListNode(0, head);
  let current = result;

  while (current.next) {
    if (current.next.val === val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }

  return result.next;
}
