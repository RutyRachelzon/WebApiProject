using Entities;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
                 
namespace Repository
{

    public class RatingRepository : IRatingRepository

    {
        IConfiguration _configuration;
        public RatingRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<Rating> addRequest(Rating RatingDetails)
        {
            string connectionString = "Data Source=srv2\\pupils;Initial Catalog=KidsClothes;Integrated Security=True;Pooling=False";
            string host = RatingDetails.Host;
            string method = RatingDetails.Method;
            string path = RatingDetails.Path;
            string UserAgent = RatingDetails.UserAgent;
            string Referer = RatingDetails.Referer;
            DateTime recordDate = DateTime.Now;
            //@recordDate,[Record_Date]
            string query = "INSERT INTO [RATING]([HOST],[METHOD],[PATH],[REFERER],[USER_AGENT],[Record_Date])" +
                             "values(@HOST,@METHOD,@PATH,@REFERER,@USER_AGENT,@Record_Date)";
            using (SqlConnection sqlconnection = new SqlConnection(connectionString))
            using (SqlCommand sqlcommand = new SqlCommand(query, sqlconnection))
            {
                sqlcommand.Parameters.Add("@HOST", SqlDbType.NVarChar,50).Value = host;
                sqlcommand.Parameters.Add("@METHOD", SqlDbType.NVarChar,10).Value = method;
                sqlcommand.Parameters.Add("@PATH", SqlDbType.NVarChar,50).Value = path;
                sqlcommand.Parameters.Add("@REFERER", SqlDbType.NVarChar,100).Value = Referer;
                sqlcommand.Parameters.Add("@USER_AGENT", SqlDbType.NVarChar,200).Value = UserAgent;
                sqlcommand.Parameters.Add("@Record_Date", SqlDbType.DateTime).Value = recordDate;
                await sqlconnection.OpenAsync();
                 sqlcommand.ExecuteNonQueryAsync();
                await sqlconnection.CloseAsync();

            }
            //sqlCommand.Parameters.Add("@RECORD_DATE", SqlDbType.DateTime).Value = record_date;
            //sqlCommand.Parameters.Add("@REFERER", SqlDbType.NVarChar).Value = Referer;
            //sqlCommand.Parameters.Add("@USERAGENT", SqlDbType.NVarChar).Value = UserAgent;


            return new Rating();
        }


    }

}
//public async Task add_request(Rating rating)
//{
//    var connectionString = _configuration.GetConnectionString("school");
//    string query = "INSERT INTO [dbo].[RATING]([HOST],[METHOD],[PATH],[REFERER],[USER_AGENT],[Record_Date])" +
//                   "values(@HOST,@METHOD,@PATH,@REFERER,@USER_AGENT,@Record_Date)";
//    using (SqlConnection sqlconnection = new SqlConnection(connectionString))
//    {
//        using (SqlCommand sqlcommand = new SqlCommand(query, sqlconnection))
//        {
//            sqlcommand.Parameters.Add("@HOST", SqlDbType.NVarChar, 50).Value = rating.Host;
//            sqlcommand.Parameters.Add("@METHOD", SqlDbType.NChar, 10).Value = rating.Method;
//            sqlcommand.Parameters.Add("@PATH", SqlDbType.NVarChar, 50).Value = rating.Path;
//            sqlcommand.Parameters.Add("@REFERER", SqlDbType.NVarChar, 100).Value = rating.Referer;
//            sqlcommand.Parameters.Add("@USER_AGENT", SqlDbType.NVarChar, 200).Value = rating.UserAgent;
//            sqlcommand.Parameters.Add("@Record_Date", SqlDbType.DateTime).Value = rating.RecordDate;
//            await sqlconnection.OpenAsync();
//            await sqlcommand.ExecuteNonQueryAsync();
//            await sqlconnection.CloseAsync();
//        }
//    }
//}
