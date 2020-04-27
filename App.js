import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let didCancel = true;

    try {
      fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then((res) => res.json())
        .then(
          (result) => {
            if (didCancel) {
              setData(result);
              setIsLoading(false);
            }
          },
          (error) => {
            setIsError(true);
            setIsLoading(false);
          },
        );
    } catch (error) {
      if (didCancel) {
        setIsError(true);
        setIsLoading(false);
      }
    }

    return () => {
      didCancel = false;
    };
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {isError && (
        <Text>No mento não foi possível realizar essa ação no momento ...</Text>
      )}
      {isLoading ? (
        <Text>Loading ...</Text>
      ) : (
        <ScrollView>
          <Text key={data.id}> Title: {data.title}</Text>
        </ScrollView>
      )}
    </View>
  );
}

export default App;
