← Go back to 
[Inventories Module Documentation](/Inventories)

# Active_Monitor.aspx

## Overview

**File**: `\Inventories\Process\Active_Monitor.aspx`
**Purpose**: Comprehensive monitoring dashboard for inventory examination and approval workflow tracking with detailed status visualization and Excel export functionality
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory managers, examination committee members, and approval workflow administrators

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Department and Employee Information (Auto-populated)**
- **Department Dropdown**: Hidden field, auto-populated based on user's employee record
- **Employee Dropdown**: Auto-populated from user authentication
- **Error Prevention**: System validates user has valid department assignment
- **Data Source**: DefinitionDep and DefinitionEmployee1 tables
- **Default Behavior**: Auto-populated from user profile on page load
- **Validation**: Only users with valid department assignments can access

#### 2. **Date Range Selection (Required for Filtering)**
- **From Date Field**: Must select start date for monitoring period
- **To Date Field**: Must select end date for monitoring period
- **Error Prevention**: System validates date range before data retrieval
- **Data Source**: User input with date validation
- **Default Behavior**: User must select both dates manually
- **Error Message**: "برجاء اختيار فترة اولا" (Please select a period first)
- **Validation**: From date must be before or equal to to date

#### 3. **Financial Year Selection (Required for Data Access)**
- **Financial Year Dropdown**: Must select financial year for data filtering
- **Error Prevention**: System validates financial year selection before data retrieval
- **Data Source**: Inventories_Stock_Years table with active status
- **Default Behavior**: User must select financial year manually
- **Error Message**: "برجاء اختيار السنة المالية" (Please select financial year)
- **Validation**: Only active financial years are available

#### 4. **Examination Committee Selection (Optional for Filtering)**
- **Committee Type Dropdown**: Optional selection for committee type filtering
- **Error Prevention**: System handles null values gracefully
- **Data Source**: Inventories_check_header table with active status
- **Default Behavior**: Optional field, defaults to all committees
- **Validation**: Only active committees with specific conditions are available

#### 5. **Item Selection (Optional for Filtering)**
- **Item Dropdown**: Optional selection for specific item filtering
- **Error Prevention**: System handles null values gracefully
- **Data Source**: Inventories_Item_Settings with drug sheet integration
- **Default Behavior**: Optional field, defaults to all items
- **Validation**: Only active items with complete drug information are available

#### 6. **Grid Row Selection (Required for Detailed Operations)**
- **Grid Row Selection**: Must select specific rows for detailed view operations
- **Error Prevention**: System validates row selection before detailed operations
- **Data Source**: Grid selection with validation
- **Default Behavior**: User must select rows manually
- **Validation**: Only selected rows are processed for detailed operations

### Common Error Scenarios and Prevention

#### **Date Range Errors**
- **Error**: "برجاء اختيار فترة اولا" (Please select a period first)
- **Prevention**: Always select both from and to dates before searching
- **Error**: Invalid date format
- **Prevention**: Use valid date format (YYYY-MM-DD)

#### **Financial Year Errors**
- **Error**: "برجاء اختيار السنة المالية" (Please select financial year)
- **Prevention**: Always select financial year before searching
- **Error**: Financial year dropdown empty
- **Prevention**: Ensure active financial years are configured

#### **Row Selection Errors**
- **Error**: Missing row selection for detailed operations
- **Prevention**: Always select rows before detailed view operations
- **Error**: Multiple row selection conflicts
- **Prevention**: Select appropriate rows for detailed operations

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have department assignment** in employee master data
3. **Financial years must be configured** with active status
4. **Examination committees must be configured** with active status
5. **Items must be configured** with complete drug information
6. **Database connection must be active** for data retrieval

#### **Required System State**
- User authentication must be active
- Department assignments must be current
- Financial year data must be current with active status
- Committee data must be current with active status
- Item master data must be current with complete drug information
- Database connection must be stable

### Success Criteria

#### **For Date Range Selection**
- ✅ Date range validation prevents data retrieval without selection
- ✅ Date fields accept valid date formats
- ✅ Date range selection works correctly with data filtering
- ✅ User feedback confirms successful date range selection

#### **For Financial Year Selection**
- ✅ Financial year selection validation prevents data retrieval without selection
- ✅ Financial year dropdown shows only active financial years
- ✅ Financial year selection works correctly with data filtering
- ✅ User feedback confirms successful financial year selection

#### **For Examination Committee Filtering**
- ✅ Committee selection works correctly with optional filtering
- ✅ Committee dropdown shows only active committees with proper conditions
- ✅ Committee filtering works correctly with data retrieval
- ✅ User feedback confirms successful committee filtering

#### **For Item Filtering**
- ✅ Item selection works correctly with optional filtering
- ✅ Item dropdown shows only active items with complete drug information
- ✅ Item filtering works correctly with data retrieval
- ✅ User feedback confirms successful item filtering

#### **For Grid Display**
- ✅ Date range and financial year selection prevent operations without requirements
- ✅ Grid display shows examination data with proper formatting and status
- ✅ Row selection works correctly for detailed operations
- ✅ Status indicators display correctly with color coding

#### **For Detailed Operations**
- ✅ Row selection validation prevents operations without selection
- ✅ Detailed view operations work correctly with proper data display
- ✅ Report generation works correctly for selected data
- ✅ Excel export works correctly with proper formatting

#### **For Data Management**
- ✅ Grid refreshes after all operations
- ✅ Selection states clear after operations
- ✅ Status updates work correctly
- ✅ Success feedback confirms operations

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" dir="rtl" ID="BootstrapFormLayout">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for active monitoring

### Header Information Section

```html
<!-- Header Information -->
<dx:BootstrapLayoutItem Caption="الادارة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox ID="Dep" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" Enabled="false" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="DepDS" ValueField="DepID" TextField="Dep_Name">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="DepID" />
                    <dx:BootstrapListBoxField FieldName="Dep_Name" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="المسؤل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox ID="ResponsableEmp" runat="server" TextFormatString="{0} - {1}" Enabled="false" AutoPostBack="True" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="Emp" ValueField="Emp_Code" TextField="User_Name">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="Emp_Code" />
                    <dx:BootstrapListBoxField FieldName="User_Name" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Date Range and Filtering Section

```html
<!-- Date Range and Filtering -->
<dx:BootstrapLayoutItem Caption="الفترة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12" BeginRow="true">
    <ContentCollection>
        <dx:ContentControl>
            <div style="display: flex; justify-content: space-between">
                <dx:BootstrapDateEdit runat="server" ID="from" AutoPostBack="false" Caption="من" Width="45%"></dx:BootstrapDateEdit>
                <dx:BootstrapDateEdit runat="server" ID="to" AutoPostBack="false" Caption="إلى" Width="45%"></dx:BootstrapDateEdit>
            </div>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="لجنة الفحص" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox ID="check_type" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="True" DataSourceID="SqlDataSource1" ValueField="id" TextField="description">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="id" />
                    <dx:BootstrapListBoxField FieldName="description" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem ColSpanMd="12" Caption="الصنف" CssClasses-Caption="cc">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox ID="Item" runat="server" AutoPostBack="True" EnableMultiColumn="true" EnableCallbackMode="false" DataSourceID="ItemDS" ValueField="item_code" TextField="arabic_name">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="arabic_name" />
                    <dx:BootstrapListBoxField FieldName="item_code" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Financial Year and Search Section

```html
<!-- Financial Year and Search -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox ID="dcyear" runat="server" Caption="السنة المالية" TextFormatString="{0}" EnableMultiColumn="true" CallbackPageSize="15" CssClasses-Caption="font-weight-bold w-15" CssClasses-Control="d-flex w-100 ml-4" EnableCallbackMode="false" DataSourceID="adoyear" ValueField="Stock_Table_Name" TextField="Stock_Year">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="Stock_Year" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="2">
    <ContentCollection>
        <dx:ContentControl>
            <div style="display: flex; justify-content: end; align-items: center">
                <dx:BootstrapButton ID="search" runat="server" ClientInstanceName="btn5" Width="100%" Text=" بحث " OnClick="search_Click">
                    <ClientSideEvents Click="function(s, e) { DisableButton3(btn5,'btn5'); }" />
                    <CssClasses Icon="simple-icon-magnifier" />
                    <SettingsBootstrap RenderOption="Success" />
                </dx:BootstrapButton>
            </div>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Main Grid Section

```html
<!-- Main Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <div style="overflow: auto;width:1500px; height: 300px">
                <dx:BootstrapGridView runat="server" ID="checkGridViewTemp" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="ID" Styles-Cell-HorizontalAlign="Center" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" AutoPostBack="true" EnableCallBacks="false" OnHtmlDataCellPrepared="checkGridViewTemp_HtmlDataCellPrepared" OnCustomColumnDisplayText="checkGridViewTemp_CustomColumnDisplayText" OnCustomButtonCallback="checkGridViewTemp_CustomButtonCallback" OnPageIndexChanged="checkGridViewTemp_PageIndexChanged">
                    <Columns>
                        <dx:BootstrapGridViewTextColumn FieldName="ID" ReadOnly="True" Visible="false" Caption="كود " VisibleIndex="0"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="NUM" Caption="مسلسل" VisibleIndex="0"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="doc_id" Caption="رقم المستند" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Itemcode" Caption=" كود الصنف" Visible="true" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="arabic_name" Caption="مسمى الصنف" Visible="true" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Amount" Caption="الكمية" Visible="true" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Price_unit" Caption="سعر الوحدة" Visible="false" VisibleIndex="5"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Grand_Total" Caption="اجمالى القيمة" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="PO_ID_FK" Caption=" رقم امر التوريد" Visible="false" VisibleIndex="7"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Store_id" Caption="المخزن الافتراضى" Visible="true" VisibleIndex="8"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="batch_no" Caption="رقم الدفعة" Visible="true" VisibleIndex="9"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="description" Caption="وحدة الشراء" Visible="false" VisibleIndex="10"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="uom_deliver_unit" Caption="وحدة الاستلام" Visible="false" VisibleIndex="11"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Done_Amount" Caption="الكمية الواردة" Visible="true" VisibleIndex="12"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Remain_Amount" Caption="الكمية المتبقية" Visible="true" VisibleIndex="13"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="delivery_id_unit" Caption="كود الاستلام" Visible="false" VisibleIndex="14"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewDateColumn FieldName="Expiration_date" Caption="تاريخ الصلاحية" Visible="true" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd" VisibleIndex="15"></dx:BootstrapGridViewDateColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="date_time" Caption="تاريخ عمل اللجنة" Visible="true" VisibleIndex="16"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="الفحص" Visible="true" VisibleIndex="17"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="head_emp_check_date" Caption="تاريخ تاكيد رئيس اللجنة" Visible="true" VisibleIndex="18"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="head_approve" Caption="رئيس اللجنة" Visible="true" VisibleIndex="19"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="head_Name" Caption="رئيس اللجنة" Visible="true" VisibleIndex="20"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="head_emp_check_reason" Caption="سبب رفض رئيس لجنه" Visible="true" VisibleIndex="21"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="emp1_check_date" Caption="تاريخ تاكيد مسؤل 1" Visible="true" VisibleIndex="22"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="emp1_approve" Caption="مسؤل 1" Visible="true" VisibleIndex="23"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="user_emp1" Caption="مسؤل 1" Visible="true" VisibleIndex="24"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="emp1_check_reason" Caption="سبب رفض مسؤل1" Visible="true" VisibleIndex="25"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="emp2_check_date" Caption="تاريخ تاكيد مسؤل 2" Visible="true" VisibleIndex="26"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="emp2_approve" Caption="مسؤل 2" Visible="true" VisibleIndex="27"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="user_emp2" Caption="مسؤل 2" Visible="true" VisibleIndex="28"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="emp2_check_reason" Caption="سبب رفض مسؤل 2" Visible="true" VisibleIndex="29"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="emp3_check_date" Caption="تاريخ تاكيد مسؤل 3" Visible="true" VisibleIndex="30"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="emp3_approve" Caption="مسؤل 3" Visible="true" VisibleIndex="31"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="user_emp3" Caption="مسؤل 3" Visible="true" VisibleIndex="32"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="emp3_check_reason" Caption="سبب رفض مسؤل 3" Visible="true" VisibleIndex="33"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="emp4_check_date" Caption="تاريخ تاكيد مسؤل 4" Visible="true" VisibleIndex="34"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="emp4_approve" Caption="مسؤل 4" Visible="true" VisibleIndex="35"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="user_emp4" Caption="مسؤل 4" Visible="true" VisibleIndex="36"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="emp4_check_reason" Caption="سبب رفض مسؤل 4" Visible="true" VisibleIndex="37"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="emp5_check_date" Caption="تاريخ تاكيد مسؤل 5" Visible="true" VisibleIndex="38"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="emp5_approve" Caption="مسؤل 5" Visible="true" VisibleIndex="39"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="user_emp5" Caption="مسؤل 5" Visible="true" VisibleIndex="40"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="emp5_check_reason" Caption="سبب رفض مسؤل 5" Visible="true" VisibleIndex="41"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="الاستلام" Visible="true" VisibleIndex="42"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="طلب  اذن الاضافة" Visible="true" VisibleIndex="43"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Adding_date" Caption="تاريخ طلب الاضافة" Visible="true" VisibleIndex="44"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="مراجعة الاضافة" Caption="مراجعة الاضافة" Visible="true" VisibleIndex="45"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="سبب رفض مراجعة الاضافة" Caption="سبب رفض مراجعة الاضافة" Visible="true" VisibleIndex="46"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Adding_rev_date" Caption="تاريخ مراجعة الاضافة" Visible="true" VisibleIndex="47"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="اعتماد الاضافة" Caption="اعتماد الاضافة" Visible="true" VisibleIndex="48"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="سبب رفض اعتماد الاضافة" Caption="سبب رفض اعتماد الاضافة" Visible="true" VisibleIndex="49"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Adding_approve_date" Caption="تاريخ اعتماد الاضافة" Visible="true" VisibleIndex="50"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="RejectReason" Caption="سبب الرفض" Visible="true" VisibleIndex="51"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Status_check" Caption="حالة" Visible="true" VisibleIndex="52"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="PO_DemandAmount" Caption="كمية امر الشراء" Visible="false" VisibleIndex="53"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Discount" Caption="الخصم" Visible="false" VisibleIndex="54"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Grand_Total" Caption="صافى السعر" Visible="false" VisibleIndex="55"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="description" Caption="وحدة الشراء" Visible="false" VisibleIndex="56"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="uom_deliver_unit" Caption="وحدة الاستلام" Visible="false" VisibleIndex="57"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Funding_Type" Caption="Funding Type" Visible="true" VisibleIndex="58"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Payment_Method" Caption="Payment Method" Visible="false" VisibleIndex="59"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Add_Doc_ID" Caption="رقم اذن الاضافة" Visible="true" VisibleIndex="60"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="supp" Caption="اسم المورد" Visible="true" VisibleIndex="61"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="donate" Caption="تبرع" VisibleIndex="62"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="PO_ID_FK" Caption="رقم امر التوريد" Visible="true" VisibleIndex="63"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="fk_check" Caption="كود اللجنة" Visible="true" VisibleIndex="64"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="check_emp_desc" Caption="منشأ اللجنة" Visible="true" VisibleIndex="65"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Emp_code" Caption=" كود منشأ اللجنة" Visible="true" VisibleIndex="66"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewCommandColumn Caption="م.اللجنة" VisibleIndex="67">
                            <CustomButtons>
                                <dx:BootstrapGridViewCommandColumnCustomButton ID="ShowRequest" Text="عرض"/>
                            </CustomButtons>
                        </dx:BootstrapGridViewCommandColumn>
                        <dx:BootstrapGridViewCommandColumn Caption="م.التوريد" VisibleIndex="68">
                            <CustomButtons>
                                <dx:BootstrapGridViewCommandColumnCustomButton ID="ShowPO" Text="عرض"/>
                            </CustomButtons>
                        </dx:BootstrapGridViewCommandColumn>
                        <dx:BootstrapGridViewCommandColumn Caption="م.الاضافة" VisibleIndex="69">
                            <CustomButtons>
                                <dx:BootstrapGridViewCommandColumnCustomButton ID="ShowAddtion" Text="عرض"/>
                            </CustomButtons>
                        </dx:BootstrapGridViewCommandColumn>
                    </Columns>
                    <Settings VerticalScrollableHeight="350" />
                    <SettingsPager PageSize="50">
                        <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                    </SettingsPager>
                    <Settings ShowFilterRow="True" ShowGroupPanel="true"></Settings>
                    <SettingsBehavior ProcessFocusedRowChangedOnServer="True" ProcessSelectionChangedOnServer="true"></SettingsBehavior>
                    <SettingsPager Mode="ShowPager" PageSize="8"></SettingsPager>
                </dx:BootstrapGridView>
            </div>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Export and Popup Section

```html
<!-- Export and Popup -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12" CaptionSettings-HorizontalAlign="Right">
    <ContentCollection>
        <dx:ContentControl>
            <asp:UpdatePanel runat="server">
                <ContentTemplate>
                    <div class="container">
                        <div class="row">
                            <div class="col text-center">
                                <dx:BootstrapButton Width="70%" runat="server" Text="اصدار شيت Excel" ID="ButtonXLSX1" OnClick="ButtonXLSX1_Click" />
                            </div>
                        </div>
                    </div>
                </ContentTemplate>
                <Triggers>
                    <asp:PostBackTrigger ControlID="ButtonXLSX1" />
                </Triggers>
            </asp:UpdatePanel>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapPopupControl runat="server" ID="POPUP2" SettingsBootstrap-Sizing="Large" Width="1200" ShowCloseButton="true" Modal="true" HeaderText="Alert" ClientInstanceName="popup" ShowHeader="true" ShowFooter="false" AllowResize="true" PopupHorizontalAlign="WindowCenter" PopupVerticalAlign="WindowCenter" CloseAction="CloseButton">
                <SettingsAdaptivity Mode="OnWindowInnerWidth" />
                <ContentCollection>
                    <dx:ContentControl>
                        <div style="width: 100%; height: 100%" class="container">
                            <iframe id="Iframe" style="width: 100%; height: 100vh;" runat="server" class="pl-2 d-flex flex-grow-1 min-width-zero"></iframe>
                        </div>
                    </dx:ContentControl>
                </ContentCollection>
            </dx:BootstrapPopupControl>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

## Data Flow Architecture

### Query String Parameters

The system uses stored procedure parameters for comprehensive data filtering:

**Date Parameters**:
- `@DateFrom` - Start date for monitoring period (required)
- `@DateTo` - End date for monitoring period (required)
- `@TableName` - Financial year table name (required)

**Filter Parameters**:
- `@check` - Committee type ID for filtering (optional)
- `@Itemcode` - Item code for filtering (optional)

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Department Auto-population**: Retrieves department from user's employee record
3. **Financial Year Loading**: Loads active financial years
4. **Committee Loading**: Loads active examination committees
5. **Item Loading**: Loads active items with drug sheet integration
6. **Data Retrieval**: Retrieves examination data using stored procedure
7. **Grid Binding**: Binds data to grid with comprehensive examination information
8. **Status Visualization**: Applies color coding and status indicators
9. **Export Operations**: Provides Excel export functionality

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication cookies
2. Auto-populates department and employee information
3. Loads default data if date range and financial year are provided
4. Binds data sources and grid
5. Sets up stored procedure parameters

### search_Click Method

```csharp
protected void search_Click(object sender, EventArgs e)
```

**Purpose**: Searches for examination data based on date range and filtering criteria

**Process**:
1. Validates date range and financial year selection
2. Sets up stored procedure parameters
3. Executes Active_Monitor stored procedure
4. Binds grid with filtered data
5. Provides user feedback for validation failures

### checkGridViewTemp_HtmlDataCellPrepared Method

```csharp
protected void checkGridViewTemp_HtmlDataCellPrepared(object sender, DevExpress.Web.Bootstrap.BootstrapGridViewTableDataCellEventArgs e)
```

**Purpose**: Applies color coding and formatting to grid cells based on status values

**Process**:
1. Handles status check color coding (Orange, Blue, Tomato, DarkOliveGreen, LawnGreen, DarkSeaGreen, Red)
2. Handles approval status color coding for committee members
3. Handles examination status color coding
4. Handles receipt status color coding
5. Handles addition request status color coding
6. Handles addition review status color coding
7. Handles addition approval status color coding

### checkGridViewTemp_CustomButtonCallback Method

```csharp
protected void checkGridViewTemp_CustomButtonCallback(object sender, DevExpress.Web.ASPxGridViewCustomButtonCallbackEventArgs e)
```

**Purpose**: Handles detailed view operations for committee, PO, and addition documents

**Process**:
1. Handles committee document display with report generation
2. Handles PO order document display with report generation
3. Handles addition document display with report generation
4. Opens popup with iframe for detailed document viewing

### ButtonXLSX1_Click Method

```csharp
protected void ButtonXLSX1_Click(object sender, EventArgs e)
```

**Purpose**: Exports grid data to Excel format

**Process**:
1. Validates date range and financial year selection
2. Executes Active_Monitor stored procedure
3. Binds grid with filtered data
4. Exports grid to Excel using Exporter component
5. Handles exceptions with user feedback

### checkGridViewTemp_CustomColumnDisplayText Method

```csharp
protected void checkGridViewTemp_CustomColumnDisplayText(object sender, DevExpress.Web.Bootstrap.BootstrapGridViewColumnDisplayTextEventArgs e)
```

**Purpose**: Customizes column display text for grid

**Process**:
1. Handles serial number display for grid rows
2. Provides custom formatting for display columns

## Database Integration

### Active_Monitor Stored Procedure

**Purpose**: Retrieves comprehensive examination and approval workflow data
**Parameters**: 
- `@DateFrom` - Start date for monitoring period
- `@DateTo` - End date for monitoring period
- `@TableName` - Financial year table name
- `@check` - Committee type ID (optional)
- `@Itemcode` - Item code (optional)
**Integration**: Links to examination, approval, and inventory tables
**Usage**: Main data source for active monitoring dashboard

### Core Database Tables

#### **DefinitionDep**
- **Purpose**: Department master data
- **Key Fields**: DepID, Dep_Name
- **Integration**: Links to employee records
- **Usage**: Provides department information for auto-population

#### **DefinitionEmployee1**
- **Purpose**: Employee master data with department assignments
- **Key Fields**: EmpID, EmpDepartment
- **Integration**: Links employees to departments
- **Usage**: Provides department auto-population from user profile

#### **Inventories_Stock_Years**
- **Purpose**: Financial year master data with table names
- **Key Fields**: Stock_Year, Stock_Table_Name, active
- **Integration**: Links to financial year data
- **Usage**: Provides financial year selection for data filtering

#### **Inventories_check_header**
- **Purpose**: Examination committee master data
- **Key Fields**: id, description, active, temp_exp, check_type, check_id
- **Integration**: Links to examination processes
- **Usage**: Provides committee selection for filtering

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with drug sheet integration
- **Key Fields**: id, arabic_name, item_code, active
- **Integration**: Links to drug sheet and effective materials
- **Usage**: Provides item selection for filtering

#### **Inventories_Item_Settings_drug_sheet**
- **Purpose**: Drug sheet master data with concentration information
- **Key Fields**: Item_Settings_fk, concentration, cb_effective_materails
- **Integration**: Links items to drug information
- **Usage**: Provides complete item information for filtering

#### **DefinitionEffectiveMaterial**
- **Purpose**: Effective material master data
- **Key Fields**: Typ_ID, Typ_Name
- **Integration**: Links to drug sheet
- **Usage**: Provides effective material information for item filtering

## Client-Side JavaScript

### Button Disabling

```javascript
function DisableButton3(buttonnameobject, buttonnamestring) {
    window.setTimeout(buttonnamestring + ".SetEnabled(false)", 0);
    var x = buttonnameobject;
    x.SetText("Please wait...");
}
```

**Purpose**: Disables buttons during operations to prevent multiple submissions

### Back Button Prevention

```javascript
function noBack() { window.history.forward(); }
noBack();
window.onload = noBack;
window.onpageshow = function (evt) { if (evt.persisted) noBack(); }
window.onunload = function () { void (0); }
```

**Purpose**: Prevents users from using browser back button

### Popup and Iframe Handling

```javascript
function OnMoreInfoClick(element, key) {
    callbackPanel.SetContentHtml("");
    popup.ShowAtElement(element);
    keyValue = key;
}
function popup_Shown(s, e) {
    callbackPanel.PerformCallback(keyValue);
}
```

**Purpose**: Handles popup display and iframe content loading

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with RTL (right-to-left) direction
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Header Information Section**
```html
<!-- Department and Employee -->
<dx:BootstrapLayoutItem Caption="الادارة" ColSpanMd="3">
<dx:BootstrapLayoutItem Caption="المسؤل" ColSpanMd="3">
```

#### **2. Date Range and Filtering Section**
```html
<!-- Date Range and Filtering -->
<dx:BootstrapLayoutItem Caption="الفترة" ColSpanMd="12" BeginRow="true">
<dx:BootstrapLayoutItem Caption="لجنة الفحص" ColSpanMd="12">
<dx:BootstrapLayoutItem ColSpanMd="12" Caption="الصنف">
```

#### **3. Financial Year and Search Section**
```html
<!-- Financial Year and Search -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="4">
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="2">
```

#### **4. Main Grid Section**
```html
<!-- Main Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **5. Export and Popup Section**
```html
<!-- Export and Popup -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
<dx:BootstrapLayoutItem Caption="" ColSpanMd="12">
```

### Data Sources and Connectivity

#### **Department Data Source**
```csharp
SqlDataSource DepDS = new SqlDataSource();
DepDS.ConnectionString = ConfigurationManager.ConnectionStrings["BackOffice_CS"].ConnectionString;
DepDS.SelectCommand = "SELECT DepID,Dep_Name FROM DefinitionDep";
```

#### **Employee Data Source**
```csharp
SqlDataSource Emp = new SqlDataSource();
Emp.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
Emp.SelectCommand = "select User_Name,Emp_Code from Users where Active=1 and Emp_Code not in ('0','00')";
```

#### **Financial Year Data Source**
```csharp
SqlDataSource adoyear = new SqlDataSource();
adoyear.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
adoyear.SelectCommand = "select Inventories_Stock_Years.Stock_Year,Stock_Table_Name from Inventories_Stock_Years where active=1";
```

#### **Committee Data Source**
```csharp
SqlDataSource SqlDataSource1 = new SqlDataSource();
SqlDataSource1.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource1.SelectCommand = "select ID,description from Inventories_check_header where (temp_exp=0 or check_type=1 ) and active=1 and check_id='1'";
```

#### **Item Data Source**
```csharp
SqlDataSource ItemDS = new SqlDataSource();
ItemDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
ItemDS.SelectCommand = "select iis.id,CONCAT(iis.arabic_name , ' - ' , drug_sheet.concentration , ' - ' , DefinitionEffectiveMaterial.Typ_Name ) as arabic_name,iis.item_code from Inventories_Item_Settings iis left join Inventories_Item_Settings_drug_sheet drug_sheet on iis.id = drug_sheet.Item_Settings_fk left join Orman.dbo.DefinitionEffectiveMaterial on DefinitionEffectiveMaterial.Typ_ID=drug_sheet.cb_effective_materails where iis.active=1";
```

#### **Header Data Source**
```csharp
SqlDataSource ds_header = new SqlDataSource();
ds_header.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
ds_header.SelectCommand = "Active_Monitor";
ds_header.SelectCommandType = "StoredProcedure";
ds_header.SelectParameters.Add("DateFrom", TypeCode.String);
ds_header.SelectParameters.Add("DateTo", TypeCode.String);
ds_header.SelectParameters.Add("check", TypeCode.String);
ds_header.SelectParameters.Add("Itemcode", TypeCode.String);
ds_header.SelectParameters.Add("TableName", TypeCode.String);
```

## Business Logic and Validation

### Date Range Validation

```csharp
protected void search_Click(object sender, EventArgs e)
{
    if (from.Text == "" || to.Text == "")
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('برجاء اختيار فترة اولا');", true);
        return;
    }
    else if (dcyear.Text == "")
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('برجاء اختيار السنة المالية');", true);
        return;
    }
    // ... search logic
}
```

**Purpose**: Validates date range and financial year selection before data retrieval
**Process**: Ensures date range and financial year are selected before searching

### Status Color Coding Logic

```csharp
protected void checkGridViewTemp_HtmlDataCellPrepared(object sender, DevExpress.Web.Bootstrap.BootstrapGridViewTableDataCellEventArgs e)
{
    if (e.DataColumn.FieldName == "Status_check")
    {
        if (Convert.ToString(e.CellValue) == "تحت الفحص")
        {
            e.Cell.BackColor = System.Drawing.Color.Orange;
            e.Cell.ForeColor = System.Drawing.Color.White;
            e.Cell.Font.Bold = true;
        }
        // ... other status conditions
    }
}
```

**Purpose**: Applies color coding to grid cells based on status values
**Process**: Handles multiple status types with different color schemes

### Detailed View Operations

```csharp
protected void checkGridViewTemp_CustomButtonCallback(object sender, DevExpress.Web.ASPxGridViewCustomButtonCallbackEventArgs e)
{
    if (e.ButtonID == "ShowRequest")
    {
        object value3 = (sender as DevExpress.Web.ASPxGridView).GetRowValues(e.VisibleIndex, "fk_check");
        var ID = Convert.ToInt32(value3);
        var reportType = "";
        reportType = ReportName.committee2;
        Iframe.Src = $"~/Report/Report_Viewer.aspx?ReportType={reportType}&PageTitle=Active_Monitor&fk_check={ID}";
        Iframe.Visible = true;
        POPUP2.ShowOnPageLoad = true;
    }
    // ... other button operations
}
```

**Purpose**: Handles detailed view operations for different document types
**Process**: Retrieves document IDs and opens popup with iframe for detailed viewing

### Excel Export Logic

```csharp
protected void ButtonXLSX1_Click(object sender, EventArgs e)
{
    try
    {
        // Data retrieval and grid binding
        Exporter.WriteXlsxToResponse("GridExport");
    }
    catch (Exception ex)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Error", "alert('" + ex + "');", true);
    }
}
```

**Purpose**: Exports grid data to Excel format with error handling
**Process**: Retrieves data, binds grid, and exports to Excel with exception handling

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Date Range Validation**: Must select both from and to dates before searching
- **Financial Year Validation**: Must select financial year before searching
- **Grid Selection Validation**: Must select rows before detailed operations
- **User Feedback**: Clear Arabic error messages for common validation failures

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for common validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operations
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Date Range Validation**: Ensures valid date range with proper format
- **Financial Year Validation**: Ensures financial year is active and available
- **Committee Validation**: Ensures committee is active with proper conditions
- **Item Validation**: Ensures item is active with complete drug information
- **Data Integrity Validation**: Ensures referential integrity

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Department Access**: Ensures user has access to their department
- **Data Access**: Ensures user has access to selected financial year data
- **Export Access**: Ensures user has permission to export data

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Export Operations**: Handles Excel export failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Search Success**: Grid updates with filtered data after successful search
- **Export Success**: Excel file download confirmation
- **Detailed View Success**: Popup display confirmation for document viewing
- **Status Update Success**: Color coding and status indicators confirm successful operations

#### **Visual Feedback**
- **Grid Updates**: Immediate grid refresh after successful operations
- **Button States**: Button text and appearance changes during operations
- **Selection Clearing**: Selection states clear after operations
- **Data Display**: Updated data displays confirm successful operations

## Integration Points

### Database Integration

#### **Examination Management System**
- **Examination Request Integration**: Links to examination request master data with approval workflow
- **Examination Details Integration**: Links to examination details with item and quantity information
- **Examination Status Integration**: Tracks examination status and approval workflow
- **Examination History Integration**: Provides comprehensive examination history with filtering

#### **Inventory Management System**
- **Item Master Integration**: Links to item master data with drug sheet and effective material information
- **Stock Integration**: Links to inventory stock with quantity tracking
- **Store Integration**: Links to warehouse stores with account mapping
- **Unit Conversion Integration**: Links to unit of measure with conversion factors

#### **Financial Management System**
- **Financial Year Integration**: Links to financial year master data with table names
- **Funding Type Integration**: Links to funding type information
- **Payment Method Integration**: Links to payment method information
- **Cost Center Integration**: Links to cost centers with allocation rules

#### **Approval Workflow System**
- **Committee Integration**: Links to examination committee master data
- **Approval Status Integration**: Tracks approval status for multiple committee members
- **Approval History Integration**: Provides comprehensive approval history
- **Rejection Reason Integration**: Links to rejection reason master data

### External Systems

#### **Report System Integration**
- **Database Tables**: Report_Viewer, ReportName constants
- **Integration Details**: Generates detailed reports for committee, PO, and addition documents
- **Data Flow**: Document selection → Report generation → Popup display

#### **Excel Export System Integration**
- **Database Tables**: ASPxGridViewExporter, XlsxExportOptions
- **Integration Details**: Exports grid data to Excel format with proper formatting
- **Data Flow**: Grid data → Excel export → File download

#### **Popup System Integration**
- **Database Tables**: BootstrapPopupControl, iframe
- **Integration Details**: Displays detailed document information in popup with iframe
- **Data Flow**: Document selection → Popup display → Iframe content loading

## Troubleshooting Guide

### Common Issues and Solutions

#### **Date Range Issues**
- **Issue**: Date range validation errors
- **Cause**: Invalid date format or missing dates
- **Solution**: Use valid date format (YYYY-MM-DD) and select both from and to dates

#### **Financial Year Issues**
- **Issue**: Financial year dropdown appears empty
- **Cause**: No active financial years configured
- **Solution**: Ensure active financial years are configured in system

#### **Committee Issues**
- **Issue**: Committee dropdown appears empty
- **Cause**: No active committees with proper conditions configured
- **Solution**: Verify committees are active with temp_exp=0 or check_type=1

#### **Item Issues**
- **Issue**: Item dropdown appears empty
- **Cause**: No active items with complete drug information
- **Solution**: Ensure items are active with complete drug sheet and effective material information

#### **Export Issues**
- **Issue**: Excel export fails
- **Cause**: Missing data or export component configuration
- **Solution**: Verify data is loaded and export component is properly configured

#### **Popup Issues**
- **Issue**: Popup doesn't display detailed information
- **Cause**: Missing document IDs or report configuration
- **Solution**: Verify document IDs are available and reports are properly configured

### System Requirements

#### **Permissions**
- **User Authentication**: Valid authentication cookies required
- **Department Access**: User must have department assignment
- **Data Access**: User must have access to selected financial year data
- **Export Access**: User must have permission to export data

#### **Data Requirements**
- **Financial Year Status**: Financial years must be active
- **Committee Status**: Committees must be active with proper conditions
- **Item Status**: Items must be active with complete drug information
- **Database Connection**: Stable database connection required

## Usage Examples

### Active Monitoring Workflow

1. **Page Access**: Navigate to Active_Monitor.aspx
2. **Date Range Selection**: Select from and to dates for monitoring period
3. **Financial Year Selection**: Select financial year for data filtering
4. **Optional Filtering**: Select committee type and/or item for specific filtering
5. **Search Operation**: Click "بحث" (Search) button to load examination data
6. **Data Review**: Review examination data in grid with color-coded status indicators
7. **Detailed Operations**: Select rows for detailed document viewing
8. **Report Generation**: Click detailed view buttons for committee, PO, or addition documents
9. **Export Operations**: Click "اصدار شيت Excel" (Export Excel) button for data export
10. **Status Monitoring**: Monitor examination and approval workflow status with color coding

### Detailed Document Viewing Workflow

1. **Grid Selection**: Select specific row in grid for detailed viewing
2. **Committee Document**: Click "م.اللجنة" (Committee Document) button
3. **PO Document**: Click "م.التوريد" (PO Document) button
4. **Addition Document**: Click "م.الاضافة" (Addition Document) button
5. **Popup Display**: Popup opens with iframe displaying detailed document
6. **Document Review**: Review detailed document information
7. **Popup Close**: Close popup to return to main grid view

### Excel Export Workflow

1. **Data Filtering**: Apply desired filters for data export
2. **Search Operation**: Click "بحث" (Search) button to load filtered data
3. **Export Operation**: Click "اصدار شيت Excel" (Export Excel) button
4. **File Download**: Excel file downloads with filtered grid data
5. **Data Review**: Review exported data in Excel format