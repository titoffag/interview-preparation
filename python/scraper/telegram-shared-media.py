from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.remote.webelement import WebElement
import time
from typing import List

watchLaterUrl = "https://www.youtube.com/playlist?list=WL"

url = "https://web.telegram.org/a/<id>"
urlName = "telegram"

driver = webdriver.Chrome()
driver.get(url=url)  # put here your link
time.sleep(5)  # wait for the page to load

# Find the ChatInfo class element and click on it
chat_info: WebElement = WebDriverWait(driver=driver, timeout=10).until(method=EC.presence_of_element_located(locator=(By.CLASS_NAME, 'ChatInfo')))
chat_info.click()

# Find the tab with content text Links
tab_list: WebElement = WebDriverWait(driver=driver, timeout=10).until(method=EC.presence_of_element_located(locator=(By.CLASS_NAME, 'TabList')))
links_tab: WebElement = WebDriverWait(driver=driver, timeout=10).until(method=EC.element_to_be_clickable(mark=(By.XPATH, '//div[@class="Tab Tab--interactive"]/span[contains(text(), "Media")]')))
links_tab.click()

# links-list
# chat-list
# media-list
# documents-list

messages_container: WebElement = WebDriverWait(driver=driver, timeout=10).until(method=EC.presence_of_element_located(locator=(By.CLASS_NAME, 'documents-list')))

# 1_000_000
# Scroll up to load older messages
with open(file='output.txt', mode='w') as f:
    for _ in range(50_000):  # adjust this value according to your needs
        driver.execute_script("arguments[0].scrollTo(0, arguments[0].scrollHeight);", messages_container)
        time.sleep(2)  # wait for the messages to load

        messages: List[WebElement] = messages_container.find_elements(By.CLASS_NAME, 'icon-download')  # replace with actual class name
        for message in messages:
            try:
                message.click()
                # text: str = message.find_element(By.CLASS_NAME, 'text-content').text
                # images: List[WebElement] = message.find_elements(By.TAG_NAME, 'img')
                # links: List[WebElement] = message.find_elements(By.TAG_NAME, 'a')
                # videos: List[WebElement] = message.find_elements(By.TAG_NAME, 'video')

                # # Write the data to the file
                # f.write(f'Text: {text}\n')
                # for image in images:
                #     f.write(f'Image: {image.get_attribute(name="src")}\n')
                # for link in links:
                #     f.write(f'Link: {link.get_attribute(name="href")}\n')
                # for video in videos:
                #     f.write(f'Video: {video.get_attribute(name="src")}\n')

                # # Add a separator for readability
                # f.write('-' * 50 + '\n')
            except NoSuchElementException:
                continue
