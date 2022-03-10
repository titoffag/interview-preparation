import { ListNode } from "./000-list-node";
import { middleNode } from "./011-middle-of-the-linked-list";
import { reverseList } from "./012-reverse-linked-list";

function isPalindrome(head: ListNode | null): boolean {
  if (!head) {
    return false;
  }

  const middle = middleNode(head);
  let reverse = reverseList(middle);

  while (reverse) {
    if (reverse.val != head.val) {
      return false;
    }

    reverse = reverse.next;
    head = head.next;
  }

  return true;
}
