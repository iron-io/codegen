# Requirements.
Python 2.7 and later.

# Howto
## Setuptools
You can install the bindings via [Setuptools](http://pypi.python.org/pypi/setuptools).

```sh
python setup.py install
```

```python
import iron_sdk
```

### IronMQ

```python
mq = iron_sdk.IronMQApi('TOKEN')

# or if you wish to use a different host.
mq = iron_sdk.IronMQApi('TOKEN', host='HOST_URL')
```

#### Get the list of queues for a project
```python
res = mq.get_queues("PROJECT_ID")
for q in res.queues:
  print q.name
```

#### Push messages to a queue
```python
messages = {'messages':[
              {'body': 'this is a message'},
              {'body': 'this is another message'}
           ]}
res = mq.post_messages("PROJECT_ID", "QUEUE_NAME", messages)
# Returns the ids of the posted messagess
message_ids = res.ids
```
#### Reserve messages
```python
messages = mq.reserve_messages("PROJECT_ID", "QUEUE_NAME", {'n': 50}).messages
for m in messages:
  print m.body

# Now we can delete them
mq.delete_messages("PROJECT_ID", "QUEUE_NAME", messages)
```
