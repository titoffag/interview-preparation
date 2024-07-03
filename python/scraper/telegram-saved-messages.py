from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import time

watchLaterUrl = "https://www.youtube.com/playlist?list=WL"

url = "https://web.telegram.org/a/<id>"
urlName = "telegram"

driver = webdriver.Firefox()
driver.get(url)  # put here your link
time.sleep(10)  # wait for the page to load

messages_container = driver.find_element(By.CLASS_NAME, 'MessageList')  # replace with actual id

# 1_000_000
# Scroll up to load older messages
with open('output.txt', 'w') as f:
    for _ in range(50_000):  # adjust this value according to your needs
        driver.execute_script('arguments[0].scrollTop = 0', messages_container)
        time.sleep(2)  # wait for the messages to load

        messages = messages_container.find_elements(By.CLASS_NAME, 'message-content-wrapper')  # replace with actual class name
        for message in messages:
            try:
                text = message.find_element(By.CLASS_NAME, 'text-content').text
                images = message.find_elements(By.TAG_NAME, 'img')
                links = message.find_elements(By.TAG_NAME, 'a')
                videos = message.find_elements(By.TAG_NAME, 'video')

                # Write the data to the file
                f.write(f'Text: {text}\n')
                for image in images:
                    f.write(f'Image: {image.get_attribute("src")}\n')
                for link in links:
                    f.write(f'Link: {link.get_attribute("href")}\n')
                for video in videos:
                    f.write(f'Video: {video.get_attribute("src")}\n')

                # Add a separator for readability
                f.write('-' * 50 + '\n')
            except NoSuchElementException:
                continue