import { ListNode } from "./000-list-node";

function hasCycle(head: ListNode | null): boolean {
  if (!head || !head.next) {
    return false;
  }

  let slow = head,
    fast = head;

  while (fast?.next) {
    [slow, fast] = [slow.next, fast.next.next];

    if (fast === slow) {
      return true;
    }
  }

  return false;
}
