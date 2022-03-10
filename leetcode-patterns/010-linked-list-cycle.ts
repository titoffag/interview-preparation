import { ListNode } from "./000-list-node";

function hasCycle(head: ListNode | null): boolean {
  let slow = head,
    fast = head;

  while (fast?.next?.next) {
    fast = fast.next.next;
    slow = slow.next;

    if (fast === slow) {
      return true;
    }
  }

  return false;
}
