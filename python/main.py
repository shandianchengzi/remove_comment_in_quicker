import re

def remove_comments(code):
    # Regular expression to match string literals (both single and double quotes)
    string_pattern = r'(".*?"|\'.*?\')'

    # Temporary replacement to avoid altering strings
    temp_code = re.sub(string_pattern, lambda m: m.group(0).replace('#', '__HASH__HASH__HASH__'), code)

    # Remove 所有的整行都是注释的行,并保留原有空行
    temp_code = re.sub(r'^[^\S\r\n]*#.*\n', '', temp_code, flags=re.MULTILINE)

    # Remove single-line comments outside of strings
    no_comments = re.sub(r'#.*', '', temp_code)

    # Restore the original strings (with the '__HASH__' placeholder replaced back with '#')
    clean_code = no_comments.replace('__HASH__HASH__HASH__', '#')

    return clean_code

# 示例代码
source_code = '''# 这是一个示例Python程序
# 它将两个数字相加并打印结果

x = 10  # 第一个数字
y = 5  # 第二个数字

# 计算并打印结果
result = x + y
a = r'#hello'
print(result)
'''

cleaned_code = remove_comments(source_code)
print(cleaned_code)
