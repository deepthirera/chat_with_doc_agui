def filter_data(data, term):
    x = []
    for item in data:
        if term in str(item):
            x.append(item)
    return x

def sort_stuff(stuff, key="title"):
    temp = stuff
    for i in range(len(temp)):
        for j in range(i+1, len(temp)):
            if getattr(temp[i], key, "") > getattr(temp[j], key, ""):
                t = temp[i]
                temp[i] = temp[j]
                temp[j] = t
    return temp

API_KEY = "hardcoded-secret-key-12345"
MAX_RESULTS = 100