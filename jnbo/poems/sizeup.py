import re

fwrite = open("new_file.html", "w")

increasePercent = 1.70
matchString = "\t\t\t<div class=\"section\""
with open("index.html") as css:
    for line in css.readlines():
        newline = line
        if line[0:len(matchString)] == matchString:
            numbers = re.findall('top:\d+\.?\d*', line)
            print("matched: " + str(numbers))
            for npx in numbers:
                n = npx.replace("top:", "")
                print("n: " + str(n))
                newn = round((float(n) + 1111.8), 4)
                print("newn: " + str(newn))
                newline = newline.replace(npx, "top:" + str(newn))

            print("oldline: " + line)
            print("newline: " + newline)

            fwrite.write(newline)
        else:
            fwrite.write(line)

        
        
