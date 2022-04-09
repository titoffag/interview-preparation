import { ListNode } from "./000-list-node";

export function middleNode(head: ListNode | null): ListNode | null {
  if (!head) {
    return null;
  }

  let slow = head,
    fast = head;

  while (fast?.next) {
    [slow, fast] = [slow.next, fast.next.next];
  }

  return slow;
}
