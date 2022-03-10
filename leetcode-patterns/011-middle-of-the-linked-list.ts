import { ListNode } from "./000-list-node";

export function middleNode(head: ListNode | null): ListNode | null {
  let slow = head,
    fast = head;

  while (fast?.next) {
    fast = fast.next.next;
    slow = slow.next;
  }

  return slow;
}
