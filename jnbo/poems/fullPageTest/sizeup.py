import re

fwrite = open("new_file.html", "w")

increasePercent = 1.70
with open("edited-generated-no-border.html") as css:
    for line in css.readlines():
        newline = line
        numbers = re.findall('\d+\.?\d*px', line)
        print("matched: " + str(numbers))
        for npx in numbers:
            n = npx.replace("px", "")
            print("n: " + str(n))
            newn = round((float(n)*increasePercent), 4)
            print("newn: " + str(newn))
            newline = newline.replace(npx, str(newn) + "px")

        #print("oldline: " + line)
        #print("newline: " + newline)

        fwrite.write(newline)

        
        
